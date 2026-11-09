import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { type SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

/** Matches Soma Select / Trigger height (medium). */
export const SEARCH_CONTROL_HEIGHT = 40

/** Soma `border/hairline` — Menu / Popup stroke. */
const SOMA_BORDER_HAIRLINE = '#D0D5DD'

export { SOMA_BORDER_HAIRLINE }

/** Soma `surface/subtle` hover on Menu Item / RadioItem / CheckboxItem. */
export const SOMA_MENU_HOVER_BG = '#EAECF0'

/**
 * Soma `shadow.md` on Menu / Popup and Select / Popup:
 * 0/12 blur 16 spread -4, plus 0/4 blur 6 spread -2, coolDarkTransparent /10.
 */
export const SOMA_MENU_SHADOW =
  '0px 12px 16px -4px rgba(16, 29, 56, 0.05), 0px 4px 6px -2px rgba(16, 29, 56, 0.05)'

/** Soma radius.sm — popup and item corners. */
export const SOMA_MENU_RADIUS = '6px'

/** Soma Menu / Popup — pad 8, radius.sm, hairline stroke, shadow.md. */
export const somaMenuPaperSx = {
  mt: 0.5,
  borderRadius: SOMA_MENU_RADIUS,
  border: '1px solid',
  borderColor: SOMA_BORDER_HAIRLINE,
  boxShadow: SOMA_MENU_SHADOW,
  py: 1,
  px: 1,
} as const

/** Soma Menu / RadioItem + CheckboxItem — 36px, pad 8/12, gap 8, radius.sm. */
export const somaMenuItemSx = {
  mx: 0,
  my: 0,
  px: 1.5,
  py: 1,
  minHeight: 36,
  height: 36,
  gap: 1,
  borderRadius: SOMA_MENU_RADIUS,
  fontSize: 14,
  fontWeight: 500,
  lineHeight: '20px',
  color: 'text.primary',
  alignItems: 'center',
  '&.Mui-selected': {
    bgcolor: 'transparent',
  },
  '&.Mui-selected:hover': {
    bgcolor: SOMA_MENU_HOVER_BG,
  },
  '&:hover': {
    bgcolor: SOMA_MENU_HOVER_BG,
  },
  '&.Mui-focusVisible': {
    bgcolor: 'transparent',
    outline: `2px solid`,
    outlineColor: 'primary.main',
    outlineOffset: -2,
  },
} as const

export const somaMenuPaperSlotProps = {
  elevation: 0,
  sx: somaMenuPaperSx,
} as const

type SomaSelectFieldProps = {
  id: string
  label: string
  value: string
  options: readonly string[]
  open: boolean
  onOpen: () => void
  onClose: () => void
  onChange: (value: string) => void
  placeholder?: string
  sx?: object
}

function ChevronDownIcon(props: ComponentPropsWithoutRef<'svg'>) {
  return (
    <Box
      component="svg"
      aria-hidden
      viewBox="0 0 24 24"
      {...props}
      sx={{
        width: 12,
        height: 12,
        color: 'icon.secondary',
        pointerEvents: 'none',
        flexShrink: 0,
      }}
    >
      <path
        d="m6 9 6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Box>
  )
}

/**
 * Soma Radio / Control in Menu / RadioItem — 16px ring, 1.5 stroke;
 * selected = action/primary ring + 8px inner dot.
 */
export function SomaMenuRadio({ selected }: { selected: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        flexShrink: 0,
        borderRadius: '50%',
        boxSizing: 'border-box',
        border: '1.5px solid',
        borderColor: selected ? 'primary.main' : SOMA_BORDER_HAIRLINE,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.paper',
      }}
    >
      {selected ? (
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'primary.main',
          }}
        />
      ) : null}
    </Box>
  )
}

/**
 * Soma Checkbox / Control in Menu / CheckboxItem — 16px, radius.xs (4).
 * Checked = action/primary fill + 1.5 white check.
 */
export function SomaMenuCheckbox({ checked }: { checked: boolean }) {
  return (
    <Box
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        flexShrink: 0,
        borderRadius: '4px',
        boxSizing: 'border-box',
        border: checked ? 0 : '1.5px solid',
        borderColor: SOMA_BORDER_HAIRLINE,
        bgcolor: checked ? 'primary.main' : 'background.paper',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {checked ? (
        <Box
          component="svg"
          viewBox="0 0 16 16"
          sx={{ width: 10, height: 10 }}
        >
          <path
            d="M3.2 8.2 6.4 11.1 12.8 4.6"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Box>
      ) : null}
    </Box>
  )
}

/**
 * Soma Select / Field — label above trigger; open menu uses Menu.RadioItem rows.
 */
export function SomaSelectField({
  id,
  label,
  value,
  options,
  open,
  onOpen,
  onClose,
  onChange,
  placeholder = 'Select option',
  sx,
}: SomaSelectFieldProps) {
  const labelId = `${id}-label`

  return (
    <Stack spacing={0.75} sx={{ minWidth: 0, width: '100%', ...sx }}>
      <Typography
        id={labelId}
        component="label"
        htmlFor={id}
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <FormControl size="small" fullWidth>
        <Select
          id={id}
          labelId={labelId}
          displayEmpty
          open={open}
          onOpen={onOpen}
          onClose={onClose}
          value={value}
          onChange={(event: SelectChangeEvent<string>) =>
            onChange(event.target.value)
          }
          IconComponent={ChevronDownIcon}
          input={
            <OutlinedInput
              notched={false}
              inputProps={{ 'aria-labelledby': labelId }}
            />
          }
          renderValue={(selected) => (
            <Typography
              component="span"
              noWrap
              sx={{
                fontSize: 14,
                lineHeight: '20px',
                letterSpacing: 0,
                color: selected ? 'text.primary' : 'text.secondary',
              }}
            >
              {selected || placeholder}
            </Typography>
          )}
          sx={{
            height: SEARCH_CONTROL_HEIGHT,
            borderRadius: SOMA_MENU_RADIUS,
            bgcolor: 'background.paper',
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: SOMA_BORDER_HAIRLINE,
              borderWidth: 1,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'text.secondary',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              borderWidth: 1,
            },
            '& .MuiSelect-select': {
              py: 0,
              pl: 1.5,
              pr: '36px !important',
              display: 'flex',
              alignItems: 'center',
              height: SEARCH_CONTROL_HEIGHT,
              boxSizing: 'border-box',
            },
            '& .MuiSelect-icon': {
              right: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              position: 'absolute',
              mr: 0,
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
            transformOrigin: { vertical: 'top', horizontal: 'left' },
            slotProps: {
              paper: somaMenuPaperSlotProps,
              list: {
                sx: { py: 0 },
                'aria-labelledby': labelId,
              },
            },
          }}
        >
          {options.map((option) => {
            const selected = option === value
            return (
              <MenuItem
                key={option}
                value={option}
                selected={selected}
                disableGutters
                sx={somaMenuItemSx}
              >
                <SomaMenuRadio selected={selected} />
                <Typography
                  component="span"
                  sx={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '20px',
                    letterSpacing: 0,
                    color: 'text.primary',
                  }}
                >
                  {option}
                </Typography>
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Stack>
  )
}

type SomaTextFieldShellProps = {
  label: string
  labelId: string
  children: ReactNode
  sx?: object
}

/** Shared Soma Field chrome: 12px label above control. */
export function SomaFieldShell({
  label,
  labelId,
  children,
  sx,
}: SomaTextFieldShellProps) {
  return (
    <Stack spacing={0.75} sx={{ minWidth: 0, ...sx }}>
      <Typography
        id={labelId}
        component="label"
        sx={{
          fontSize: 12,
          fontWeight: 500,
          lineHeight: '16px',
          letterSpacing: 0,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  )
}
