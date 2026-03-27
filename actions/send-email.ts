'use server'

import { z } from 'zod'
import { Resend } from 'resend'

export type FormState = {
  success: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

const contactFormSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
})

export async function sendEmail(prevState: FormState | null, formData: FormData): Promise<FormState> {
  console.log("Server Action iniciada...")

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error("ERRO CRÍTICO: RESEND_API_KEY não encontrada nas variáveis de ambiente.")
    return { success: false, message: "Erro interno de configuração (API Key missing)." }
  }

  const resend = new Resend(apiKey)

  const data = Object.fromEntries(formData.entries())
  const result = contactFormSchema.safeParse(data)

  if (!result.success) {
    return { 
      success: false, 
      errors: result.error.flatten().fieldErrors 
    }
  }

  try {
    console.log("Tentando enviar email via Resend...")
    
    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'kelvinkauan722@gmail.com',
      subject: `Nova mensagem de ${result.data.name}`,
      text: `Nome: ${result.data.name}\nEmail: ${result.data.email}\n\nMensagem:\n${result.data.message}`,
      headers: {
        'Reply-To': result.data.email
      }
    })

    console.log("Email enviado com sucesso!")
    return { success: true, message: "Email enviado com sucesso!" }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
    
    console.error('ERRO NO SERVER:', errorMessage);

    return { 
      success: false, 
      message: `ERRO REAL: ${errorMessage}` 
    }
  }
}