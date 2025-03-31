import VerticalLayout from './VerticalLayout.js'
import ErrorPage from "./ErrorPage.js"
import LoadingPage from "./LoadingPage.js"

import Actions from './Actions.js'

const row = (ded) => {
  return (`
    <tr>
      <td>${ded.type}</td>
      <td>${ded.name}</td>
      <td>${ded.date}</td>
      <td>${ded.amount} €</td>
      <td>${ded.status}</td>
      <td>
        ${Actions(ded.fileUrl)}
      </td>
    </tr>
    `)
  }

  const rows = (data) => {
    if (!data || !data.length) return "";
  
    // Sort in ascending order (earliest to latest)
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    return sortedData.map(ded => row(ded)).join("");
  };

export default ({ data: deds, loading, error }) => {
  
  const modal = () => (`
    <div class="modal fade" id="modaleFile" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Justificatif</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          </div>
        </div>
      </div>
    </div>
  `)

  if (loading) {
    return LoadingPage()
  } else if (error) {
    return ErrorPage(error)
  }
  
  return (`
    <div class='layout'>
      ${VerticalLayout(120)}
      <div class='content'>
        <div class='content-header'>
          <div class='content-title'>  Mes Demandes d'engagement de dépenses </div>
          <button type="button" data-testid='btn-new-ded' class="btn btn-secondary">Nouvelle DED</button>
        </div>
        <div id="data-table">
        <table id="example" class="table table-striped" style="width:100%">
          <thead>
              <tr>
                <th>Type</th>
                <th>Nom</th>
                <th>Date</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody data-testid="tbody">
            ${rows(deds)}
          </tbody>
          </table>
        </div>
      </div>
      ${modal()}
    </div>`
  )
}
