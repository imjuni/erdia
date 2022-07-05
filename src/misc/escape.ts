export default function escape(content: string, replace?: string): string {
  return content.replace(
    /([\f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff])/g,
    replace ?? '.',
  );
}

export function reaplceNewline(content: string, replace?: string): string {
  const newline = replace ?? '<br />';

  return content.replace(/\r\n/g, newline).replace(/\n\r/g, newline).replace(/\r/g, newline).replace(/\n/g, newline);
}
