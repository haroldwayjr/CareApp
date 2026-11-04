import { useMemo, useState } from 'react'
import { ContextPanel } from './ContextPanel'
import { Button } from './ui/Button'
import { Chip } from './ui/Chip'
import { Icon } from './icons'
import { Modal } from './ui/Modal'
import { SearchField } from './ui/SearchField'
import * as p from './ContextPanel.css'
import * as s from './EligibilityPanel.css'

const benefits = [
  { name: 'Therapy', meta: '12 visits remaining · $20 copay' },
  { name: 'Psychiatry', meta: 'Covered after deductible' },
  { name: 'Nutrition counseling', meta: '6 visits per year' },
  { name: 'Virtual primary care', meta: 'Unlimited · $0 copay' },
  { name: 'Physical therapy', meta: '20 visits · $40 copay' },
  { name: 'Care and Case Management', meta: 'Included with enrollment' },
]

export function EligibilityPanel({ onClose }: { onClose: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [detail, setDetail] = useState<string | null>(null)
  const [edit, setEdit] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [status, setStatus] = useState<'Enrolled' | 'Unenrolled'>('Enrolled')
  const visible = useMemo(() => benefits.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())), [query])
  const toggle = (name: string) => setSelected((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name])

  if (detail) {
    return (
      <ContextPanel title="Benefit Details" onClose={onClose}>
        <div className={p.body}>
          <button className={s.back} onClick={() => setDetail(null)}><Icon name="arrowLeft" size={18} /> Back to benefits</button>
          <h2>{detail}</h2>
          {[
            ['Overview', 'Outpatient behavioral health support with in-network providers.'],
            ['Care Team Notes', 'Confirm provider availability before referral.'],
            ['When to recommend', 'When a member requests ongoing emotional or behavioral support.'],
            ['Questions to ask', 'Do you prefer virtual or in-person care? Do you have a provider in mind?'],
            ['Cost and Coverage', '$20 copay per visit. Twelve covered visits remain this year.'],
          ].map(([heading, copy]) => <section className={p.section} key={heading}><h3 className={p.sectionTitle}>{heading}</h3><p className={p.muted}>{copy}</p></section>)}
        </div>
      </ContextPanel>
    )
  }

  return (
    <ContextPanel title="Eligibility" onClose={onClose}>
      <div className={p.body}>
        <section className={p.section}>
          <Info label="Carrier" value="Blue Shield of California" /><Info label="Coverage" value="Active" /><Info label="Plan" value="Gold PPO 500" /><Info label="Phone" value="(800) 555-0199" />
          <div className={p.footer}><Button onClick={() => setEdit(true)}>Edit enrollment status</Button></div>
        </section>
        <section className={p.section}>
          <h3 className={p.sectionTitle}>Member Benefits</h3>
          <SearchField value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search benefits" aria-label="Search benefits" />
          <div className={s.toolbar}>{selected.length > 0 ? <Chip>{selected.length} benefit(s) selected</Chip> : <span className={p.muted}>Select benefits to refer</span>}</div>
          {visible.map((benefit) => {
            const isSelected = selected.includes(benefit.name)
            return (
              <div className={`${s.benefit} ${isSelected ? s.benefitSelected : ''}`} key={benefit.name}>
                <input type="checkbox" checked={isSelected} onChange={() => toggle(benefit.name)} aria-label={`Select ${benefit.name}`} />
                <button className={p.listButton} onClick={() => setDetail(benefit.name)}>
                  <div className={s.benefitName}>{benefit.name}</div><div className={s.benefitMeta}>{benefit.meta}</div>
                </button>
                <Icon name="chevronRight" size={16} />
              </div>
            )
          })}
          <Button tone="primary" disabled={!selected.length}>Mark benefit(s) as referred</Button>
        </section>
      </div>

      <Modal open={edit} onOpenChange={setEdit} title="Edit enrollment status" description="Update Jose’s current eligibility status."
        actions={<><Button onClick={() => setEdit(false)}>Cancel</Button><Button tone="primary" onClick={() => { setEdit(false); setConfirm(true) }}>Save</Button></>}>
        <div className={s.toggle}>
          {(['Enrolled', 'Unenrolled'] as const).map((option) => <button key={option} className={s.toggleOption} aria-pressed={status === option} onClick={() => setStatus(option)}>{option}</button>)}
        </div>
      </Modal>
      <Modal danger open={confirm} onOpenChange={setConfirm} title="Are you sure?" description="Changing enrollment status can affect benefit access."
        actions={<><Button onClick={() => setConfirm(false)}>Cancel</Button><Button tone="danger" onClick={() => setConfirm(false)}>Yes, change status</Button></>}>
        <p className={p.dangerBox}>Jose will be marked as {status.toLowerCase()}.</p>
      </Modal>
    </ContextPanel>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className={p.row}><span className={p.label}>{label}</span><span className={p.value}>{value}</span></div>
}
