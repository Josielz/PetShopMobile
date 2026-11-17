-- Projeto - Pet Shop | Etapa 01: Login
-- PostgreSQL / Supabase Auth
-- Executar uma única vez em um projeto Supabase novo.
-- Se public.perfis ou o trigger já existirem, revisar antes de executar.

CREATE TABLE public.perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL DEFAULT '',
    tipo TEXT NOT NULL DEFAULT 'FUNCIONARIO'
        CHECK (tipo IN ('ADMIN', 'FUNCIONARIO')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Todo usuário criado pelo Auth recebe perfil FUNCIONARIO por padrão.
-- Nunca confiar em metadados enviados pelo cliente para definir ADMIN.
CREATE OR REPLACE FUNCTION public.criar_perfil_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.perfis (id, nome, tipo)
    VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data ->> 'nome', ''), 'FUNCIONARIO')
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

CREATE TRIGGER ao_criar_usuario
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.criar_perfil_usuario();

ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

-- Usuário autenticado pode consultar apenas o próprio perfil.
CREATE POLICY "Consultar proprio perfil"
ON public.perfis FOR SELECT TO authenticated
USING ((SELECT auth.uid()) = id);

-- Não criar policy de INSERT, UPDATE ou DELETE para authenticated.
-- Cadastro de funcionários e alterações de papéis são operações
-- privilegiadas do backend; jamais expor service_role no frontend.
-- Primeiro ADMIN: promover manualmente um usuário previamente criado,
-- em operação administrativa controlada, nunca via cadastro público.
