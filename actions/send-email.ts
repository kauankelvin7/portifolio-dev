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
  name: z.string().trim().min(2, "Digite seu nome."),
  email: z.string().trim().email("Digite um e-mail válido."),
  message: z.string().trim().min(10, "Escreva um pouco mais para eu entender sua mensagem."),
})

export async function sendEmail(_prevState: FormState | null, formData: FormData): Promise<FormState> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.')
    return {
      success: false,
      message: "Não foi possível enviar sua mensagem agora. Você também pode falar comigo pelo LinkedIn ou e-mail."
    }
  }

  const result = contactFormSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }

  try {
    const resend = new Resend(apiKey)

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'kelvinkauan722@gmail.com',
      subject: `Contato pelo portfólio — ${result.data.name}`,
      text: `Nome: ${result.data.name}\nEmail: ${result.data.email}\n\nMensagem:\n${result.data.message}`,
      headers: {
        'Reply-To': result.data.email
      }
    })

    return {
      success: true,
      message: "Mensagem enviada. Obrigado pelo contato — respondo assim que puder."
    }
  } catch (error) {
    console.error('Portfolio contact form failed.', error)
    return {
      success: false,
      message: "Não foi possível enviar sua mensagem agora. Tente novamente ou use um dos contatos ao lado."
    }
  }
}
