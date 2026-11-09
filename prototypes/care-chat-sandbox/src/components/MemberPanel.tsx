import { useMemo, useState } from 'react'
import { Tabs } from '@base-ui/react/tabs'
import { ContextPanel } from './ContextPanel'
import { Button } from './ui/Button'
import { Icon } from './icons'
import { IconButton } from './ui/IconButton'
import { Modal } from './ui/Modal'
import { SearchField } from './ui/SearchField'
import * as p from './ContextPanel.css'
import * as s from './MemberPanel.css'

const allPeople = [
  { name: 'Maya Chen, RN', role: 'Care Coordinator' },
  { name: 'Jordan Lee, RD', role: 'Dietitian' },
  { name: 'Sam Ortiz, RN', role: 'Nurse Care Manager' },
  { name: 'Priya Shah, MD', role: 'Primary Care' },
]

function InfoRow({ label, value }: { label: string; value: string }) {
  return <div className={p.row}><span className={p.label}>{label}</span><span className={p.value}>{value}</span></div>
}

export function MemberPanel({ onClose }: { onClose: () => void }) {
  const [manage, setManage] = useState(false)
  const [search, setSearch] = useState('')
  const [team, setTeam] = useState(allPeople.slice(0, 2))
  const [draft, setDraft] = useState(team)
  const results = useMemo(() => allPeople.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())), [search])

  const openManage = () => { setDraft(team); setSearch(''); setManage(true) }
  const togglePerson = (person: (typeof allPeople)[number]) =>
    setDraft((current) => current.some((item) => item.name === person.name)
      ? current.filter((item) => item.name !== person.name)
      : [...current, person])

  return (
    <ContextPanel title="Member Information" onClose={onClose}>
      <Tabs.Root defaultValue="member">
        <Tabs.List className={p.tabs}>
          <Tabs.Tab className={p.tab} value="member">Member</Tabs.Tab>
          <Tabs.Tab className={p.tab} value="care">Care Team</Tabs.Tab>
          <Tabs.Tab className={p.tab} value="dependents">Dependents</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="member" className={p.body}>
          {[
            ['Personal', [['Name', 'Jose Googlekoepp'], ['Date of birth', 'May 14, 1988'], ['Pronouns', 'He / him']]],
            ['Contact', [['Phone', '(415) 555-0138'], ['Email', 'jose.g@example.com'], ['Location', 'San Francisco, CA']]],
            ['Account', [['Member ID', '49280175'], ['Language', 'English'], ['Status', 'Active']]],
          ].map(([heading, rows]) => (
            <section className={p.section} key={heading as string}>
              <div className={p.row}><h3 className={p.sectionTitle}>{heading as string}</h3><IconButton icon="edit" label={`Edit ${heading}`} /></div>
              {(rows as string[][]).map(([label, value]) => <InfoRow key={label} label={label} value={value} />)}
            </section>
          ))}
        </Tabs.Panel>
        <Tabs.Panel value="care" className={p.body}>
          <p className={p.muted}>Clinicians and coordinators currently supporting Jose.</p>
          <div className={s.teamList}>{team.map((person) => <Person key={person.name} {...person} />)}</div>
          <div className={p.footer}><Button tone="primary" onClick={openManage}>Manage Care Team</Button></div>
        </Tabs.Panel>
        <Tabs.Panel value="dependents" className={p.body}>
          <div className={p.card}><div className={s.personName}>Sofia Googlekoepp</div><div className={s.role}>Dependent · Age 12</div></div>
          <div className={p.card}><div className={s.personName}>Mateo Googlekoepp</div><div className={s.role}>Dependent · Age 8</div></div>
        </Tabs.Panel>
      </Tabs.Root>

      <Modal
        open={manage}
        onOpenChange={setManage}
        title="Manage Care Team"
        description="Search and assign care team members."
        actions={<><Button onClick={() => setManage(false)}>Cancel</Button><Button tone="primary" onClick={() => { setTeam(draft); setManage(false) }}>Save</Button></>}
      >
        <SearchField value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search care team" aria-label="Search care team" />
        <h3>Current Care Team</h3>
        <div className={s.teamList}>
          {draft.map((person) => (
            <div className={s.teamRow} key={person.name}>
              <Person {...person} />
              <button className={s.remove} aria-label={`Remove ${person.name}`} onClick={() => togglePerson(person)}><Icon name="delete" size={16} /></button>
            </div>
          ))}
        </div>
        <h3>Available</h3>
        {results.filter((person) => !draft.some((item) => item.name === person.name)).map((person) => (
          <div className={s.teamRow} key={person.name}><Person {...person} /><Button onClick={() => togglePerson(person)}>Assign</Button></div>
        ))}
      </Modal>
    </ContextPanel>
  )
}

function Person({ name, role }: { name: string; role: string }) {
  return <div className={s.person}><div className={s.avatar}>{name.charAt(0)}</div><div className={s.personInfo}><div className={s.personName}>{name}</div><div className={s.role}>{role}</div></div></div>
}
