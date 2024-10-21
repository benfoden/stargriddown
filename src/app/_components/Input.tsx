"use client";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

export default function Input({
  type,
  label,
  fileSelectButtonLabel,
  defaultChecked,
  radioOptions,
  showHidePassword,
  initialValue,
  ...props
}: {
  type?:
    | "text"
    | "textarea"
    | "number"
    | "email"
    | "password"
    | "checkbox"
    | "radio"
    | "file";
  label?: string;
  fileSelectButtonLabel?: string;
  defaultChecked?: boolean;
  radioOptions?: {
    id: string;
    label: string;
    value: string | number;
    checked?: boolean;
  }[];
  showHidePassword?: boolean;
  initialValue?: string | number | boolean | undefined;
} & React.InputHTMLAttributes<
  | HTMLInputElement
  | HTMLTextAreaElement
  | (HTMLInputElement & { type: "checkbox" })
>) {
  if (!type) type = "text";
  const { id, value, onChange } = props;

  const ref = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState<string | undefined>(
    (value ?? initialValue) as string | undefined,
  );
  const [isActive, setIsActive] = useState(false);
  const [valueLength, setValueLength] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(defaultChecked ?? false);
  const [radioChoices] = useState<
    { id: string; label: string; value: string | number; checked?: boolean }[]
  >(radioOptions ?? []);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (type === "checkbox") {
      setIsChecked((event.target as HTMLInputElement).checked);
    } else {
      setInputValue(event.target.value);
      setValueLength(event.target.value.length);

      if (onChange) {
        onChange(event);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (type === "checkbox") {
      setValueLength(null);
    } else if (
      typeof initialValue === "string" ||
      Array.isArray(initialValue)
    ) {
      setValueLength(inputValue?.length ?? null);
    } else if (typeof initialValue === "number") {
      setValueLength(inputValue?.toString().length ?? null);
    } else {
      setValueLength(null);
    }
  }, [initialValue, inputValue, type]);

  useEffect(() => {
    if (value) {
      setIsActive(true);
    }
  }, [value]);

  return (
    <div className={`relative flex w-full flex-col items-start`}>
      {type !== "radio" && (
        <label
          className={`text-secondary flex w-full flex-row items-center justify-start gap-2 bg-transparent bg-none px-5 py-1 text-sm`}
          htmlFor={id}
        >
          <span>
            {props.required && label?.length && (
              <span className="text-red-500">∗</span>
            )}{" "}
            <span>{label}</span>
          </span>
          {(type === "textarea" || type === "text") &&
            props.maxLength &&
            valueLength !== null &&
            valueLength > 0.5 * (props.maxLength ?? 0) && (
              <span
                className={`text-xs ${valueLength !== null && valueLength > 0.85 * (props.maxLength ?? 0) ? (valueLength === props.maxLength ? "text-red-600" : "text-yellow-500") : "text-secondary"}`}
              >
                {valueLength ?? 0} / {props.maxLength ?? 0}
              </span>
            )}
          {type === "password" && props.minLength && valueLength !== null && (
            <span
              className={`text-xs ${
                valueLength < props.minLength
                  ? "text-red-600"
                  : valueLength === props.minLength
                    ? "text-yellow-500"
                    : "text-green-600"
              }`}
            >
              {valueLength ?? 0} / {props.minLength ?? 0}+
            </span>
          )}
        </label>
      )}
      {type !== "textarea" &&
        type !== "checkbox" &&
        type !== "file" &&
        type !== "radio" &&
        type !== "password" && (
          <>
            <input
              type={type}
              {...props}
              value={inputValue}
              className={`w-full rounded-md px-5 py-3 text-base outline-none transition placeholder:text-sm placeholder:font-light placeholder:text-white/60 ${isActive && "bg-amber-500/80 transition dark:bg-amber-500/[.18]"} bg-primary ${props.disabled && "opacity-60"}`}
              ref={ref as React.RefObject<HTMLInputElement>}
              onFocus={handleFocus}
              onChange={(e) => {
                if (props.onChange) {
                  props.onChange(e);
                }
                handleChange(e);
              }}
            />
          </>
        )}
      {type === "password" && (
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            {...props}
            value={inputValue}
            className={`w-full rounded-md px-5 py-3 text-base outline-none transition placeholder:text-sm placeholder:font-light placeholder:text-white/60 ${isActive && "bg-amber-500/80 transition dark:bg-amber-500/[.18]"} bg-primary`}
            ref={ref as React.RefObject<HTMLInputElement>}
            onFocus={handleFocus}
            onChange={(e) => {
              if (props.onChange) {
                props.onChange(e);
              }
              handleChange(e);
            }}
          />
          {showHidePassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 transform text-sm text-gray-600 dark:text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeClosedIcon className="h-5 w-5" />
              ) : (
                <EyeOpenIcon className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
      {type === "radio" && (
        <fieldset className="flex w-full flex-col">
          <legend className="text-secondary flex w-full flex-row items-center gap-2 px-5 py-1 text-sm">
            {props.required && label && <span className="text-red-500">∗</span>}
            <span>{label}</span>
          </legend>
          <div className="flex flex-row flex-wrap gap-2 text-sm">
            {radioChoices?.map((option) => (
              <label
                key={option.id}
                className="bg-primary flex w-full flex-row items-center gap-2 rounded-md border-2 border-transparent px-4 py-2 text-center transition-opacity duration-200 ease-in-out hover:border-amber-500/80 hover:opacity-100"
              >
                <input
                  type="radio"
                  id={option.id}
                  {...props}
                  ref={ref as React.RefObject<HTMLInputElement>}
                  onFocus={handleFocus}
                  value={option.value}
                  checked={
                    option.value === inputValue || option.value === initialValue
                  }
                  onChange={(e) => {
                    if (props.onChange) {
                      props.onChange(e);
                    }
                    handleChange(e);
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        </fieldset>
      )}
      {/* {radioChoices?.map((option, index) => (
              <label
                key={index}
                htmlFor={option.id}
                className={`w-full cursor-pointer rounded-md bg-amber-500/10 px-4 py-2 text-center transition-opacity duration-200 ease-in-out hover:bg-amber-500/30 hover:opacity-100 ${!option.checked ? "opacity-60" : "bg-amber-500/60"}`}
              >
                <input
                  type="radio"
                  id={option.id}
                  {...props}
                  ref={ref as React.RefObject<HTMLInputElement>}
                  onFocus={handleFocus}
                  value={option.value}
                  checked={option.checked}
                  className="hidden"
                  onChange={(e) => {
                    setRadioChoices((prevChoices) =>
                      prevChoices.map((choice) =>
                        choice.id === e.target.id
                          ? { ...choice, checked: true }
                          : { ...choice, checked: false },
                      ),
                    );
                  }}
                />
                <span className="text-white">{option.label}</span>
              </label>
            ))} */}
      {type === "textarea" && (
        <>
          <textarea
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            className={`w-full rounded-md py-4 pl-5 pr-10 outline-none transition placeholder:text-sm placeholder:font-light ${isActive && "bg-amber-500/[.18]"} bg-primary`}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            onFocus={handleFocus}
            onChange={handleChange}
            rows={7}
            value={inputValue}
          />
        </>
      )}
      {type === "checkbox" && (
        <input
          type={type ?? "checkbox"}
          {...props}
          checked={isChecked}
          className={`mb-4 ml-5 mt-1 ${props.disabled && "cursor-not-allowed"}`}
          ref={ref as React.RefObject<HTMLInputElement>}
          onFocus={handleFocus}
          onChange={(e) => {
            if (props.onChange) {
              props.onChange(e);
            }
            handleChange(e);
          }}
        />
      )}
      {type === "file" && (
        <label className="bg-primary w-full cursor-pointer rounded-md bg-amber-500/60 py-4 pl-5 pr-10 text-center text-sm outline-none transition placeholder:text-sm placeholder:font-light hover:bg-amber-500/90 dark:bg-amber-500/20 dark:hover:bg-amber-500/30">
          <input
            type="file"
            {...props}
            className="hidden"
            ref={ref as React.RefObject<HTMLInputElement>}
            onFocus={handleFocus}
            onChange={(e) => {
              handleChange(e);
              if (props.onChange) {
                props.onChange(e);
              }
              if (e.target.files && e.target.files.length > 0) {
                const fileName = e.target.files[0]?.name ?? "";
                e.target.nextElementSibling!.textContent = fileName;
              }
            }}
          />
          <span>{fileSelectButtonLabel ?? "Choose a file"}</span>
        </label>
      )}
    </div>
  );
}
