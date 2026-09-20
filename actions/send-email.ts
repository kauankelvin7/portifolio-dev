'use server'

import { Resend } from 'resend'
import { createContactFormSchema, hasHumanFillTime } from '@/features/contact/contact-schema'

export type FormState = {
  success: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

type Locale = 'pt' | 'en' | 'es'

const copy = {
  pt: {
    name: 'Digite seu nome.',
    email: 'Digite um e-mail válido.',
    message: 'Escreva um pouco mais para eu entender sua mensagem.',
    tooLong: 'O conteúdo ultrapassou o limite permitido.',
    unavailable: 'Não foi possível enviar sua mensagem agora. Você também pode falar comigo pelo LinkedIn ou e-mail.',
    failed: 'Não foi possível enviar sua mensagem agora. Tente novamente ou use um dos contatos ao lado.',
    success: 'Mensagem enviada. Obrigado pelo contato — respondo assim que puder.'
  },
  en: {
    name: 'Enter your name.',
    email: 'Enter a valid email address.',
    message: 'Write a little more so I can understand your message.',
    tooLong: 'The content is longer than the allowed limit.',
    unavailable: 'I could not send your message right now. You can also reach me on LinkedIn or by email.',
    failed: 'I could not send your message right now. Please try again or use one of the contact links.',
    success: 'Message sent. Thanks for reaching out — I will reply as soon as I can.'
  },
  es: {
    name: 'Escribe tu nombre.',
    email: 'Escribe un correo válido.',
    message: 'Escribe un poco más para que pueda entender tu mensaje.',
    tooLong: 'El contenido supera el límite permitido.',
    unavailable: 'No pude enviar tu mensaje ahora. También puedes contactarme por LinkedIn o correo.',
    failed: 'No pude enviar tu mensaje ahora. Inténtalo de nuevo o usa uno de los enlaces de contacto.',
    success: 'Mensaje enviado. Gracias por escribir — responderé en cuanto pueda.'
  }
} satisfies Record<Locale, Record<string, string>>

function getLocale(value: FormDataEntryValue | null): Locale {
  return value === 'en' || value === 'es' ? value : 'pt'
}

export async function sendEmail(_prevState: FormState | null, formData: FormData): Promise<FormState> {
  const locale = getLocale(formData.get('locale'))
  const t = copy[locale]

  // Bots commonly fill the trap field or submit before a person could finish the form.
  if (
    String(formData.get('website') ?? '').trim() ||
    !hasHumanFillTime(formData.get('formStartedAt'))
  ) {
    return { success: true, message: t.success }
  }

  const contactFormSchema = createContactFormSchema(t)

  const result = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  })

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('Contact email environment is not fully configured.')
    return { success: false, message: t.unavailable }
  }

  try {
    const resend = new Resend(apiKey)
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Contato pelo portfólio — ${result.data.name}`,
      text: `Nome: ${result.data.name}\nEmail: ${result.data.email}\n\nMensagem:\n${result.data.message}`,
      replyTo: result.data.email,
    })

    if (error) {
      console.error('Portfolio contact form provider error.', error)
      return { success: false, message: t.failed }
    }

    return { success: true, message: t.success }
  } catch (error) {
    console.error('Portfolio contact form failed.', error)
    return { success: false, message: t.failed }
  }
}
