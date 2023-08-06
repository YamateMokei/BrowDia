import React from "react";
import ReactDOMServer from 'react-dom/server';
import './../../../../App.css';
import './css/Element.css';
import './css/Set.css';
import { template_listStyle, template_station, template_timetableFont, template_track, template_trainType, entitiesList } from "./Entity/Entity"
import { isStation, isRgb, RgbConverter, isTimetableFont, TimeConverter } from "./SharedFunction";

type InputProps = {
  value: any;
  onChange: React.ChangeEventHandler<HTMLElement>;
  onFocus?: React.FocusEventHandler<HTMLElement>;
  className?: string;
  label?: string | React.ReactElement;
  dataLogo?: any;
  src?: string;
  disabled?: boolean;
  textArea?: boolean;
  time?: boolean;
  dataGray?: string;
}

export function Input(props: InputProps) {
  return (
    <>
      {typeof props.value === "string" &&
        (!props.textArea
          ? (props.onFocus
            ? (props.dataGray
              ? <input type="text" className={props.className + " gray"} value={props.value} onChange={props.onChange} onFocus={props.onFocus} disabled={props.disabled} data-gray={props.dataGray} />
              : <input type="text" className={props.className} value={props.value} onChange={props.onChange} onFocus={props.onFocus} disabled={props.disabled} />
            )
            : <input type="text" className={props.className} value={props.value} onChange={props.onChange} disabled={props.disabled} />
          )
          : <textarea className={props.className} onChange={props.onChange} disabled={props.disabled}>{props.value}</textarea>
        )
      }
      {typeof props.value === "number" &&
        <input type="number" className={props.className} value={props.value} onChange={props.onChange} disabled={props.disabled} />
      }
      {isRgb(props.value) &&
        <input type="color" className={props.className} value={RgbConverter(props.value)} onChange={props.onChange} disabled={props.disabled} />
      }
      {typeof props.value === "boolean" && (!props.label
        ?
          <>
            <label className={"checkbox " + props.className}>
              <input type="checkbox" onChange={props.onChange} checked={props.value} />
            </label>
          </>
        : (!props.dataLogo
          ?
            <>
              <label className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
          :
            <>
              <label data-logo={props.dataLogo} className={props.className}>
                <input type="radio" onChange={props.onChange} checked={props.value} />
                {props.label}
              </label>
            </>
        )
      )}
    </>
  )
}

type IndexListboxProps = {
  values: template_station[] | template_track[] | template_trainType[] | template_timetableFont[] | template_listStyle[];
  selectedIndex: number;
  set: (index: number) => void;
}

export function IndexListbox(props: IndexListboxProps) {
  const className = (value: template_station | template_track | template_trainType | template_listStyle, index: number): string => {
    if (isStation(value)) {
      return `${!value.border && (index == props.values.length && "line")} ${value.brunchCoreStationIndex && "gray"}`
    }
    return "";
  }

  return (
    <fieldset>
      {props.values.map((value: template_station | template_track | template_trainType | template_timetableFont | template_listStyle, index: number) => (
        <>
          {isTimetableFont(value)
            ? <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} index={index} label={value.family} key={index} />
            : <IndexListboxHandler selectedIndex={props.selectedIndex} set={props.set} index={index} label={value.name} className={className(value, index)} key={index} />
          }
        </>
      ))}
    </fieldset>
  )
}

type IndexListboxHandlerProps = {
  index: number;
  selectedIndex: number;
  set: (index: number) => void;
  label: string;
  className?: string;
}

function IndexListboxHandler(props: IndexListboxHandlerProps) {
  const onChange = (): void => {
    props.set(props.index)
  }

  return (
    <Input value={props.selectedIndex == props.index} onChange={onChange} label={props.label} dataLogo={props.index + 1} className={props.className} />
  )
}

export default Input;