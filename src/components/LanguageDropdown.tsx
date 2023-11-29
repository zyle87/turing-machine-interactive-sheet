import Clear from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { alpha, useTheme } from "@mui/material/styles";
import { FC, ReactNode } from "react";

type Props = {
    customFontSize?: string;
    customRadius?: string;
    disabled?: boolean;
    iconRender?: ReactNode;
    prefixId?: string;
    maxChars?: number;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    onReset?: () => void;
    type?: "text" | "number" | "password";
    value?: Nullable<number | string>;
    withReset?: boolean;
    withStackRadius?: boolean;
    min?: number;
    max?: number;
};

const LanguageDropdown: FC<Props> = (props) => {
    const theme = useTheme();

    return (
        <Box
            position="relative"
            sx={
                props.withStackRadius
                    ? {
                        "&:not(:last-child)": {
                            mb: 0.5,
                        },
                        "&:first-of-type": {
                            input: {
                                borderRadius: theme.spacing(2, 2, 0, 0),
                            },
                        },
                        "&:last-child": {
                            input: {
                                borderRadius: theme.spacing(0, 0, 2, 2),
                            },
                        },
                    }
                    : null
            }
        >
            <select
                id={`${props.prefixId}-select`}
                disabled={props.disabled}
                value={props.value === null ? "" : props.value}
                onChange={(event) => {
                    props.onChange && props.onChange(event.target.value);
                }}
                onBlur={() => {
                    props.onBlur && props.onBlur();
                }}
                style={{
                    ...theme.typography.body1,
                    background: "none",
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    border: "none",
                    borderRadius: props.customRadius,
                    color: theme.palette.text.primary,
                    height: 48,
                    paddingLeft: props.iconRender ? theme.spacing(5) : undefined,
                    textAlign: props.iconRender ? undefined : "center",
                    fontSize: props.customFontSize || theme.spacing(3),
                    width: "100%",
                    WebkitAppearance: "none",
                    backgroundImage: props.disabled ? "none" :`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"> <path fill="${encodeURIComponent(theme.palette.primary.dark,)}" d="M8.12 9.29 12 13.17l3.88-3.88c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41l-4.59 4.59c-.39.39-1.02.39-1.41 0L6.7 10.7a.9959.9959 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"/></svg>')`,
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "85%",
                    backgroundPositionY: "center",
                    backgroundSize: "24px",
                    opacity: "unset"
                }}
            >
                <option value={""} disabled hidden></option>
                <option value={"BR"}>Português</option>
                <option value={"CNS"}>简体中文</option>
                <option value={"CNT"}>繁體中文</option>
                <option value={"CZ"}>Česky</option>
                <option value={"DE"}>Deutsch</option>
                <option value={"EN"}>English</option>
                <option value={"FR"}>Français</option>
                <option value={"GR"}>Ελληνικά</option>
                <option value={"HU"}>Magyar</option>
                <option value={"IT"}>Italiano</option>
                <option value={"JP"}>日本語</option>
                <option value={"KR"}>한국어</option>
                <option value={"NL"}>Dutch</option>
                <option value={"PL"}>Polski</option>
                <option value={"RU"}>Русский</option>
                <option value={"SP"}>Español</option>
                <option value={"TH"}>ไทย</option>
                <option value={"UA"}>Українська</option>
            </select>
            {props.iconRender && (
                <Box
                    alignItems="center"
                    display="flex"
                    height={48}
                    left={0}
                    ml={1}
                    position="absolute"
                    top={0}
                    sx={{color: theme.palette.primary.main}}
                >
                    {props.iconRender}
                </Box>
            )}
            {props.value && props.withReset && (
                <Box
                    alignItems="center"
                    display="flex"
                    height={48}
                    right={4}
                    ml={1}
                    position="absolute"
                    top={0}
                >
                    <IconButton
                        id={`${props.prefixId}-select__clear-button`}
                        color="primary"
                        onClick={props.onReset}
                    >
                        <Clear/>
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default LanguageDropdown;
