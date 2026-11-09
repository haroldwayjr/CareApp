import * as s from './ChatPane.css'

export function ChatPane() {
  return (
    <section className={s.pane} aria-label="Chat with Jose Googlekoepp">
      <header className={s.member}>
        <div className={s.name}>Jose Googlekoepp</div>
        <div className={s.meta}>Active member · ID 49280175</div>
      </header>
      <div className={s.conversation}>
        <div className={s.timestamp}>Today, 1:05 PM</div>
        <div className={s.bubble}>Hi Jose, I’m reviewing your benefits now. What can I help you find today?</div>
        <div className={`${s.bubble} ${s.own}`}>I’d like to understand my therapy coverage and compare my current plan.</div>
        <div className={s.bubble}>Absolutely. I’ll walk through your eligibility and plan details with you.</div>
      </div>
      <div className={s.composer}>Type a message…</div>
    </section>
  )
}
