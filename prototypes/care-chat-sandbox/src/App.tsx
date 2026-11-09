import { useState } from 'react'
import { AppShell } from './components/AppShell'
import { ChatPane } from './components/ChatPane'
import { EligibilityPanel } from './components/EligibilityPanel'
import { InsurancePanel } from './components/InsurancePanel'
import { MemberPanel } from './components/MemberPanel'
import { ToolRail, type PanelName } from './components/ToolRail'

export default function App() {
  const [active, setActive] = useState<PanelName | null>('member')
  const toggle = (panel: PanelName) => setActive((current) => current === panel ? null : panel)

  return (
    <AppShell>
      <ChatPane />
      {active === 'member' && <MemberPanel onClose={() => setActive(null)} />}
      {active === 'eligibility' && <EligibilityPanel onClose={() => setActive(null)} />}
      {active === 'insurance' && <InsurancePanel onClose={() => setActive(null)} />}
      <ToolRail active={active} onToggle={toggle} />
    </AppShell>
  )
}
