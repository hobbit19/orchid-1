import React, {FC} from "react";
import {Row} from "react-bootstrap";
import {isEthAddress} from "../api/orchid-eth";

const BigInt = require("big-integer"); // Mobile Safari requires polyfill

/*
export function getURLParams() {
  let result = new URLParams();
  let params = new URLSearchParams(document.location.search);
  result.potAddress = params.get("pot");
  result.amount = params.get("amount");
  return result;
}*/

// Return the relative path of the deployment 
export function basePath(): string {
  let pathComponents = new URL(window.location.href).pathname.split('/');
  pathComponents.pop();
  return pathComponents.join('/');
}

export function extraPath(): string|undefined {
  let pathComponents = new URL(window.location.href).pathname.split('/');
  return pathComponents.pop();
}

export function hashPath(): string|undefined {
  return new URL(window.location.href).hash;
}

export function getParam(name: string): string|null {
  let params = new URL(window.location.href).searchParams;
  return params.get(name);
}

export function getEthAddressParam(name: string, defaultValue: string): string {
  let addr = getParam(name);
  // Some servers won't let you put a big hex string in the url
  if (addr != null && !addr.startsWith("0x")) {
    addr = "0x"+addr;
  }
  if (addr != null && isEthAddress(addr)) {
    return addr;
  } else {
    return defaultValue;
  }
}

export function isNumeric(val: any) {
  if (val == null || val === "") {
    return false;
  }
  return !isNaN(val)
}

// Return the float value or null if not numeric.
export function parseFloatSafe(val: string): number | null {
  return isNumeric(val) ? parseFloat(val) : null;
}

// Return the BigInt value or null if not numeric.
export function parseBigIntSafe(val: string): BigInt | null {
  return isNumeric(val) ? BigInt(parseFloat(val)) : null;
}

export function errorClass(val: boolean): string {
  return val ? "error" : "hidden";
}

export function pascalCase(str: string): string {
  return str.replace(/^(.)/, (c) => {
    return c.toUpperCase()
  })
}

export function camelCase(str: string): string {
  return str.replace(/^(.)/, (c) => {
    return c.toLowerCase()
  })
}

export const Divider: FC<{ noGutters?: boolean }> = (props) => {
  return <Row
    className={props.noGutters ? "no-gutters" : ""}
    style={{
      height: '1px',
      backgroundColor: 'lightGrey',
    }}/>
};

export const Visibility: FC<{ visible: boolean }> = (props) => {
  return <div className={props.visible ? "" : "hidden"}>{props.children}</div>
};

export function copyTextToClipboard(text: string) {
  // https://stackoverflow.com/questions/49618618/copy-current-url-to-clipboard
  let dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.value = text;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
}
