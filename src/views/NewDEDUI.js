import VerticalLayout from './VerticalLayout.js'

export default () => {
  return (`
    <div class='layout'>
      ${VerticalLayout(120)}
      <div class='content'>
        <div class='content-header'>
          <div class='content-title'> Nouvelle DED </div>
        </div>
        <div class='content-form'>
          <form data-testid="form-new-ded">
            <div class="form-group">
              <label for="expense-type">Type de dépense</label>
              <select class="form-control" data-testid="expense-type">
                <option value="Transports">Transports</option>
                <option value="Restaurants et bars">Restaurants et bars</option>
                <option value="Hôtel et logement">Hôtel et logement</option>
                <option value="Services en ligne">Services en ligne</option>
                <option value="IT et électronique">IT et électronique</option>
                <option value="Equipement et matériel">Equipement et matériel</option>
                <option value="Fournitures de bureau">Fournitures de bureau</option>
              </select>
            </div>
            <div class="form-group">
              <label for="expense-name">Nom de la dépense</label>
              <input type="text" class="form-control" data-testid="expense-name" required>
            </div>
            <div class="form-group">
              <label for="amount">Montant TTC</label>
              <input type="number" class="form-control" data-testid="amount" required>
            </div>
            <div class="form-group">
              <label for="datepicker">Date</label>
              <input type="date" class="form-control" data-testid="datepicker" required>
            </div>
            <div class="form-group">
              <label for="vat">TVA</label>
              <input type="number" class="form-control" data-testid="vat">
            </div>
            <div class="form-group">
              <label for="pct">Pourcentage</label>
              <input type="number" class="form-control" data-testid="pct" required>
            </div>
            <div class="form-group">
              <label for="commentary">Commentaire</label>
              <textarea class="form-control" data-testid="commentary"></textarea>
            </div>
            <div class="form-group">
              <label for="file">Justificatif</label>
              <input type="file" class="form-control" data-testid="file" required>
            </div>
            <button type="submit" class="btn btn-primary">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  `)
}