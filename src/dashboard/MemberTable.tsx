import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { AppIcon } from '../icons/AppIcon'
import { MoreActions } from '../soma/MoreActions'
import { soma } from '../soma/tokens'
import { ExpandedRow } from './ExpandedRow'
import { ownerShort, PAGE_SIZE, topicOf, watcherLabel, type MemberNeed } from './mockDashboard'
import { NeedBadges } from './NeedBadges'

const GRID =
  '28px minmax(120px, 160px) 110px 110px 120px 130px minmax(180px, 1fr) 48px'

type MemberTableProps = {
  needs: MemberNeed[]
  expandedId: string | null
  page: number
  pageCount: number
  total: number
  onToggle: (id: string) => void
  onOpen: (id: string) => void
  onWatch: (id: string) => void
  onPage: (page: number) => void
  onToast: (message: string) => void
}

function pageButtons(page: number, pageCount: number): Array<number | '…'> {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)
  const items: Array<number | '…'> = [1, 2, 3, '…', pageCount]
  if (page > 3 && page < pageCount) return [1, '…', page, '…', pageCount]
  return items
}

export function MemberTable({
  needs,
  expandedId,
  page,
  pageCount,
  total,
  onToggle,
  onOpen,
  onWatch,
  onPage,
  onToast,
}: MemberTableProps) {
  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const end = Math.min(page * PAGE_SIZE, total)
  const pages = pageButtons(page, pageCount)

  return (
    <Stack spacing={1.5}>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ minWidth: 980 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: GRID,
              alignItems: 'center',
              height: 36,
              px: 1.5,
              gap: 1,
              bgcolor: soma.surface.subtle,
              borderTopLeftRadius: `${soma.radius.md}px`,
              borderTopRightRadius: `${soma.radius.md}px`,
            }}
          >
            <Box />
            {['Member', 'Health Grade', 'Owner', 'Watchers', 'Due Date', 'Topic'].map((column) => (
              <Typography key={column} sx={{ ...soma.type.caption, color: soma.text.secondary }}>
                {column}
              </Typography>
            ))}
            <Typography sx={{ ...soma.type.caption, color: soma.text.secondary, textAlign: 'right' }}>
              Actions
            </Typography>
          </Box>
          {needs.map((need) => {
            const expanded = expandedId === need.id
            return (
              <Box key={need.id}>
                <Box
                  onClick={() => onToggle(need.id)}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: GRID,
                    alignItems: 'center',
                    minHeight: 60,
                    px: 1.5,
                    gap: 1,
                    cursor: 'pointer',
                    bgcolor: expanded ? soma.surface.selected : soma.surface.default,
                    borderBottom: '1px solid',
                    borderColor: soma.border.hairline,
                    '&:hover': { bgcolor: expanded ? soma.surface.selected : soma.surface.subtle },
                  }}
                >
                  <IconButton
                    aria-label={expanded ? `Collapse ${need.name}` : `Expand ${need.name}`}
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation()
                      onToggle(need.id)
                    }}
                    sx={{ width: 24, height: 24, color: soma.icon.tertiary }}
                  >
                    <AppIcon name={expanded ? 'chevronDown' : 'chevronRight'} sx={{ fontSize: 16 }} />
                  </IconButton>
                  <Typography sx={{ ...soma.type.subtitle2, color: soma.text.primary }} noWrap>
                    {need.name}
                  </Typography>
                  <NeedBadges need={need} only="health" />
                  <Button
                    variant="text"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation()
                      onToast(`Prototype only — ${need.owner}’s profile is not connected.`)
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      minWidth: 0,
                      px: 0,
                      textTransform: 'none',
                      ...soma.type.body2,
                    }}
                  >
                    {ownerShort(need.owner)}
                  </Button>
                  <Typography sx={{ ...soma.type.body2, color: soma.text.secondary }} noWrap>
                    {watcherLabel(need)}
                  </Typography>
                  <Typography sx={{ ...soma.type.body2, color: soma.text.secondary }} noWrap>
                    {need.dueLabel}
                  </Typography>
                  <Button
                    variant="text"
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation()
                      onOpen(need.id)
                    }}
                    sx={{
                      justifyContent: 'flex-start',
                      minWidth: 0,
                      px: 0,
                      textTransform: 'none',
                      ...soma.type.body2,
                    }}
                  >
                    <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {topicOf(need)}
                    </Box>
                  </Button>
                  <Box sx={{ justifySelf: 'end' }} onClick={(event) => event.stopPropagation()}>
                    <MoreActions
                      label={`Actions for ${need.name}`}
                      actions={[
                        { label: 'Open member', icon: 'edit', onClick: () => onOpen(need.id) },
                        { label: 'Open thread', icon: 'copy', onClick: () => onOpen(need.id) },
                        {
                          label: 'Message owner',
                          icon: 'clock',
                          onClick: () =>
                            onToast(
                              need.owner === 'Unowned'
                                ? `${need.name} has no owner to message.`
                                : `Prototype only — message to ${need.owner} is not connected.`,
                            ),
                        },
                        {
                          label: need.watching ? 'Remove watcher' : 'Add watcher',
                          icon: 'trash',
                          tone: 'danger',
                          dividerBefore: true,
                          onClick: () => onWatch(need.id),
                        },
                      ]}
                    />
                  </Box>
                </Box>
                {expanded ? (
                  <ExpandedRow need={need} onOpenThread={() => onOpen(need.id)} onToast={onToast} />
                ) : null}
              </Box>
            )
          })}
        </Box>
      </Box>
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
        <Typography sx={{ ...soma.type.caption, color: soma.text.secondary }}>
          Showing {start}–{end} of {total} members
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
          <Button size="small" disabled={page <= 1} onClick={() => onPage(page - 1)} sx={soma.type.body2}>
            Previous
          </Button>
          {pages.map((value, index) =>
            value === '…' ? (
              <Typography key={`gap-${index}`} sx={{ ...soma.type.body2, color: soma.text.tertiary, px: 0.5 }}>
                …
              </Typography>
            ) : (
              <Button
                key={value}
                size="small"
                aria-current={value === page ? 'page' : undefined}
                onClick={() => onPage(value)}
                sx={{
                  minWidth: 32,
                  ...soma.type.body2,
                  color: value === page ? soma.text.brand : soma.text.secondary,
                  bgcolor: value === page ? soma.surface.subtle : 'transparent',
                }}
              >
                {value}
              </Button>
            ),
          )}
          <Button size="small" disabled={page >= pageCount} onClick={() => onPage(page + 1)} sx={soma.type.body2}>
            Next
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}
