import * as React from 'react';
import { FC } from 'react';
import { Select as BaseSelect, SelectProps, SelectRootSlotProps, } from '@mui/base/Select';
import { Option as BaseOption, optionClasses } from '@mui/base/Option';
import { SelectOption } from '@mui/base/useOption';
import { styled } from '@mui/system';
import { Popper as BasePopper } from '@mui/base/Popper';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import { useTheme } from "@mui/material/styles";
import { CircleFlag } from "react-circle-flags";

type Props = {
  disabled?: boolean;
  prefixId?: string;
  onChange?: (value: string) => void;
  value?: string;
};

declare type Language = {
  code: string;
  language: string;
  tm: string;
};

const availableCountries: Language[] = [
  {code: 'pt', language: "Português", tm: 'BR'},
  {code: 'cn', language: '简体中文', tm: 'CNS'},
  {code: 'cn', language: '繁體中文', tm: 'CNT'},
  {code: 'cz', language: 'Česky', tm: "CZ"},
  {code: 'de', language: 'Deutsch', tm: "DE"},
  {code: 'uk', language: 'English', tm: 'EN'},
  {code: 'fr', language: 'Français', tm: 'FR'},
  {code: 'gr', language: 'Ελληνικά', tm: 'GR'},
  {code: 'hu', language: 'Magyar', tm: 'HU'},
  {code: 'it', language: 'Italiano', tm: 'IT'},
  {code: 'jp', language: '日本語', tm: 'JP'},
  {code: 'kr', language: '한국어', tm: 'KR'},
  {code: 'nl', language: 'Dutch', tm: 'NL'},
  {code: 'pl', language: 'Polski', tm: 'PL'},
  {code: 'ru', language: 'Русский', tm: 'RU'},
  {code: 'es', language: 'Español', tm: "SP"},
  {code: 'th', language: 'ไทย', tm: 'TH'},
  {code: 'ua', language: 'Українська', tm: 'UA'},
];

const LanguageSelect: FC<Props> = (props) => {

  function getCountry() {
    return availableCountries.find(c => c.tm === props.value);
  }

  return (
    <Select
      id={`${props.prefixId}-select`}
      disabled={props.disabled}
      value={getCountry()}
      renderValue={(selected: SelectOption<Language> | null) =>
        <CircleFlag countryCode={selected?.value.code || "uk"} height={24}/>}
      onChange={(_, value) => {
        props.onChange && props.onChange((value && value.tm) || "EN");
      }}
    >
      {availableCountries.map((country: Language) => (
        <Option
          key={`${country.code}-${country.tm}`}
          value={country}
        >
          <CircleFlag countryCode={country?.code || "uk"} height={24}/>
          {country.language}
        </Option>
      ))}
    </Select>
  );
}

export default LanguageSelect;

const Select = React.forwardRef(function CustomSelect(
  props: SelectProps<Language, false>,
  ref: React.ForwardedRef<any>
) {
  const slots: SelectProps<Language, false>['slots'] = {
    root: Button,
    listbox: Listbox,
    popper: Popper,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots}/>;
});

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const theme = useTheme();
  const {ownerState, ...other} = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <KeyboardArrowDownRounded fontSize="large" sx={{color: theme.palette.primary.light}}/>
    </StyledButton>
  );
});

const StyledButton = styled('button', {shouldForwardProp: () => true})(
  ({theme}) => `
  box-sizing: border-box;
  min-width: 80px;
  padding: 8px;
  text-align: left;
  line-height: 1.5;
  background: none;
  border: none;
  position: relative;
  opacity: unset;
  
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  -webkit-appearance: none;
  
  &:hover {
    cursor: pointer;
  }

  & img {
    vertical-align: sub;
  }

  & > svg {
    position: absolute;
    top: 0;
  }
  `
);

const Listbox = styled('ul')(
  ({theme}) => `
  font-family: "Plus Jakarta Sans";
  font-size: 1rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 2px 0;
  min-width: 160px;
  max-height: 300px;
  border-radius: 8px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.background.paper};
  border: 1px solid ${theme.palette.mode === 'dark' ? theme.palette.languageSwitch[800] : theme.palette.languageSwitch[100]};
  `
);

const Option = styled(BaseOption)(
  ({theme}) => `
  list-style: none;
  padding: 4px;
  border-radius: 4px;
  cursor: default;

  &.${optionClasses.selected},
  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.languageSwitch[900] : theme.palette.languageSwitch[100]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.languageSwitch[100] : theme.palette.languageSwitch[900]};
  }

  &:hover,
  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === 'dark' ? theme.palette.languageSwitch[800] : theme.palette.languageSwitch[100]};
    color: ${theme.palette.mode === 'dark' ? theme.palette.languageSwitch[300] : theme.palette.languageSwitch[900]};
  }

  &:hover {
    cursor: pointer;
  }

  & img {
    margin-right: 10px;
    vertical-align: middle;
  }
  `
);

const Popper = styled(BasePopper)`
  z-index: 10;
`;
