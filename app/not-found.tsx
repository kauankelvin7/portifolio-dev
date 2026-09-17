import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--background)] px-5 text-[var(--text)]">
      <div className="max-w-xl text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">404</p>
        <h1 className="mt-5 font-display text-[clamp(3rem,10vw,6rem)] leading-[0.9] tracking-[-0.055em] text-white">
          Página não encontrada.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[var(--text-muted)]">
          O endereço pode ter mudado ou não existir mais. O portfólio continua disponível pela página inicial.
        </p>
        <Link href="/" className="button-primary mt-8">Voltar ao início</Link>
      </div>
    </main>
  );
}
