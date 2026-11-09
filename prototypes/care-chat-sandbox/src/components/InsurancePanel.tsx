import { useState } from 'react'
import { ContextPanel } from './ContextPanel'
import { Button } from './ui/Button'
import { Chip } from './ui/Chip'
import * as p from './ContextPanel.css'
import * as s from './InsurancePanel.css'

const plans = [
  { name: 'Gold PPO 500', carrier: 'Blue Shield', state: 'Active' },
  { name: 'Silver HMO 1500', carrier: 'Kaiser Permanente', state: 'Available' },
  { name: 'Gold HMO 750', carrier: 'Anthem', state: 'Available' },
]
const comparison = [
  ['Monthly Premium', '$486', '$392'],
  ['Deductible', '$500', '$1,500'],
  ['OOP Max', '$4,500', '$6,500'],
  ['Coinsurance', '20%', '30%'],
  ['Primary Care Copay', '$20', '$35'],
  ['Specialist Copay', '$40', '$65'],
]

export function InsurancePanel({ onClose }: { onClose: () => void }) {
  const [comparing, setComparing] = useState(false)
  const [table, setTable] = useState(false)
  const [reviewed, setReviewed] = useState(false)
  const [selected, setSelected] = useState(['Gold PPO 500'])
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name])

  return (
    <>
      <ContextPanel title="Insurance Information" onClose={onClose}>
        <div className={p.body}>
          {reviewed && <div className={s.reviewed}>Plan comparison reviewed with member.</div>}
          <section className={p.section}>
            <Info label="Plan" value="Gold PPO 500" /><Info label="Carrier" value="Blue Shield of California" /><Info label="Group number" value="G-884290" /><Info label="Member ID" value="49280175" />
          </section>
          <div className={p.footer}><Button tone="primary" onClick={() => { setComparing(true); setTable(false) }}>Compare Plans</Button></div>
        </div>
      </ContextPanel>
      {comparing && (
        <ContextPanel title={table ? 'Plan Details' : 'Compare Plans'} onClose={() => setComparing(false)}>
          <div className={p.body}>
            {!table ? (
              <>
                <p className={p.muted}>Choose two plans to compare side by side.</p>
                {plans.map((plan) => {
                  const isSelected = selected.includes(plan.name)
                  return (
                    <label className={`${s.plan} ${isSelected ? s.planSelected : ''}`} key={plan.name}>
                      <input type="checkbox" checked={isSelected} onChange={() => toggle(plan.name)} />
                      <span className={s.planInfo}>
                        <span className={s.planName}>{plan.name}</span>
                        <span className={s.planMeta}>{plan.carrier} · {plan.state}</span>
                      </span>
                    </label>
                  )
                })}
                {selected.length > 0 && <Chip>{selected.length} plan(s) selected</Chip>}
                <div className={p.footer}><Button tone="primary" disabled={selected.length !== 2} onClick={() => setTable(true)}>Compare Plan Details</Button></div>
              </>
            ) : (
              <>
                <table className={s.table}>
                  <thead><tr><th className={`${s.cell} ${s.heading}`}>Coverage</th><th className={`${s.cell} ${s.heading}`}>Available</th><th className={`${s.cell} ${s.heading}`}>Active</th></tr></thead>
                  <tbody>{comparison.map(([label, available, active]) => <tr key={label}><th className={s.cell}>{label}</th><td className={s.cell}>{available}</td><td className={s.cell}>{active}</td></tr>)}</tbody>
                </table>
                <div className={p.footer}><Button onClick={() => setTable(false)}>Back</Button><Button tone="primary" onClick={() => { setReviewed(true); setComparing(false) }}>Done reviewing</Button></div>
              </>
            )}
          </div>
        </ContextPanel>
      )}
    </>
  )
}

function Info({ label, value }: { label: string; value: string }) {
  return <div className={p.row}><span className={p.label}>{label}</span><span className={p.value}>{value}</span></div>
}
