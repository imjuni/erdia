const mermaidVersion = '9.1.3';
const bulmaVersion = '0.9.3';

// <script>mermaid.initialize({startOnLoad:true});</script>

export default function htmlTemplate(table: string, mermaid: string) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title>ER diagram generated by erdia</title>
  
    <meta charset="utf-8">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/${bulmaVersion}/css/bulma.min.css"
      integrity="sha512-IgmDkwzs96t4SrChW29No3NXBIBv8baW490zk5aXvhCD8vuZM3yUSkbyTBcXohkySecyzIrUwiF/qV0cuPcL3Q=="
      crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/${mermaidVersion}/mermaid.min.js"></script>\
    ${mermaid !== '<script>mermaid.initialize({startOnLoad:true});</script>' ? '' : ''}
    
  </head>
  
  <body>
    ${table !== '' ? `<section class="section is-large">\n${table}\n</section>` : ''}${
    mermaid !== '' ? `<section class="section is-large">\n${mermaid}\n</section>` : ''
  }
  </body>
  
  </html>
  `.trim();
}
