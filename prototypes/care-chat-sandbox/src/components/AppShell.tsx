import type { ReactNode } from 'react'
import * as s from './AppShell.css'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <main className={s.page}>
      <section className={s.app}>
        <div className={s.workspace}>
          <header className={s.topbar}>
            <div className={s.brand}>Included Care</div>
            <div className={s.agent}>Care Navigation · Live</div>
          </header>
          <div className={s.content}>{children}</div>
        </div>
      </section>
    </main>
  )
}
