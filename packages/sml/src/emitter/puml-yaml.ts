import ejs from 'ejs'
import { SmlYaml } from '../lang/sml-yaml'

const render = ejs.compile(`
@startyaml
<% for (let hl of highlights) { %>
#highlight  <%- hl.split('.').map(JSON.stringify).join(' / ') -%>
<% } %>

<%- yaml %>
@endyaml
`)

export function pmlYaml(sml: SmlYaml) {
  return render((sml as any).meta).trim()
}
