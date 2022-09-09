import ejs from 'ejs'
import { SmlJson } from '../lang/sml-json'

const render = ejs.compile(`
@startjson
<% for (let hl of highlights) { %>
#highlight  <%- hl.split('.').map(JSON.stringify).join(' / ') -%>
<% } %>

<%- JSON.stringify(json, null, 2) %>
@endjson
`)

export function pmlJson(sml: SmlJson) {
  return render((sml as any).meta).trim()
}
