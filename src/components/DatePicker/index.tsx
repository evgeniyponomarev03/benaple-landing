import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import {
  createTheme,
  ThemeProvider,
} from '@mui/material/styles'
import dayjs, { Dayjs } from 'dayjs'
import {
  CalendarIcon,
  DatePickerDownArrowIcon,
  DatePickerLeftArrowIcon,
  DatePickerRightArrowIcon,
} from '../icons/Icons'

interface DatePickerInputProps {
  onSelect?: (date: string) => void
}

const theme = createTheme({
  palette: {
    primary: { main: '#40A8C5' },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          flexDirection: 'row', // icon left, value right
          borderRadius: '8px',
          fontSize: '14px',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#40A8C5',
          },
        },
        input: {
          order: 2, // date text after icon
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          order: 1, // icon first

          marginRight: 0,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#40A8C5',
        },
      },
    },
  },
})

export default function DatePickerInput({
  onSelect,
}: DatePickerInputProps) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          defaultValue={dayjs()}
          onChange={(value: Dayjs | null) => {
            if (value && onSelect) {
              onSelect(value.format('YYYY-MM-DD'))
            }
          }}
          className="custom-datepicker"
          slotProps={{
            textField: {
              className: 'custom-datepicker__input',
            },
            openPickerButton: {
              className: 'custom-datepicker__icon',
            },
            inputAdornment: {
              position: 'start',
            },
            popper: {
              className: 'custom-datepicker__popper',
            },
            desktopPaper: {
              className: 'custom-datepicker__paper',
              sx: {
                width: 280,
                height: 280,
                '& .MuiDayCalendar-header': {
                  padding: '0 4px',
                },
                '& .MuiDayCalendar-weekContainer': {
                  margin: '1px 0',
                },
                '& .MuiPickersDay-root': {
                  fontFamily: 'Inter, sans-serif',
                  width: '32px',
                  height: '32px',
                  fontSize: '14px',
                },
                '& .MuiDayCalendar-weekDayLabel': {
                  fontFamily: 'Manrope, sans-serif',
                  width: '32px',
                  height: '32px',
                  fontSize: '14px',
                  color: '#172B5FB2',
                  fontWeight: 600,
                },
                '& .MuiPickersCalendarHeader-root': {
                  paddingLeft: '25px',
                  paddingRight: '20px',
                  paddingTop: '25px',
                  paddingBottom: '23px',
                  margin: 0,
                },

                '& .css-5wchs2-MuiDateCalendar-root': {
                  width: 280,
                },

                '& .css-1chuxo2-MuiPickersCalendarHeader-label':
                  {
                    color: '#172B5FB2',
                    fontFamily: 'Manrope',
                    fontWeight: 600,
                    fontSize: 14,
                  },
                '& .MuiYearCalendar-root': {
                  width: 280,
                  maxHeight: 200,
                },

                '& .Mui-selected': {
                  backgroundColor: '#40A8C5 !important',
                  color: '#ffffff !important',
                  '&:hover': {
                    backgroundColor: '#40A8C5 !important',
                  },
                },
                '& .MuiPickersDay-root.Mui-selected': {
                  backgroundColor: '#40A8C5 !important',
                  color: '#ffffff !important',
                  '&:hover': {
                    backgroundColor: '#40A8C5 !important',
                  },
                },
                '& .css-1szvqlk-MuiButtonBase-root-MuiIconButton-root':
                  {
                    marginRight: 0,
                    marginLeft: 0,
                  },
              },
            },
          }}
          slots={{
            openPickerIcon: CalendarIcon,
            leftArrowIcon: DatePickerLeftArrowIcon,
            rightArrowIcon: DatePickerRightArrowIcon,
            switchViewIcon: DatePickerDownArrowIcon,
          }}
        />
      </LocalizationProvider>
    </ThemeProvider>
  )
}
