import { formatDate } from '../app/format.js'
import DashboardFormUI from '../views/DashboardFormUI.js'
import BigBilledIcon from '../assets/svg/big_billed.js'
import { ROUTES_PATH } from '../constants/routes.js'
import USERS_TEST from '../constants/usersTest.js'
import Logout from "./Logout.js"

export const filteredBills = (data, status) => {
  return (data && data.length) ?
    data.filter(bill => {
      let selectCondition

      // in jest environment
      if (typeof jest !== 'undefined') {
        selectCondition = (bill.status === status)
      }
      /* istanbul ignore next */
      else {
        // in prod environment
        const userEmail = JSON.parse(localStorage.getItem("user")).email
        selectCondition =
          (bill.status === status) &&
          ![...USERS_TEST, userEmail].includes(bill.email)
      }

      return selectCondition
    }) : []
}

export const filteredDeds = (data, status) => {
  return (data && data.length) ?
    data.filter(ded => {
      let selectCondition

      // in jest environment
      if (typeof jest !== 'undefined') {
        selectCondition = (ded.status === status)
      }
      /* istanbul ignore next */
      else {
        // in prod environment
        const userEmail = JSON.parse(localStorage.getItem("user")).email
        selectCondition =
          (ded.status === status) &&
          ![...USERS_TEST, userEmail].includes(ded.email)
      }

      return selectCondition
    }) : []
}

export const card = (bill) => {
  const firstAndLastNames = bill.email.split('@')[0]
  const firstName = firstAndLastNames.includes('.') ?
    firstAndLastNames.split('.')[0] : ''
  const lastName = firstAndLastNames.includes('.') ?
  firstAndLastNames.split('.')[1] : firstAndLastNames

  return (`
    <div class='bill-card' id='open-bill${bill.id}' data-testid='open-bill${bill.id}'>
      <div class='bill-card-name-container'>
        <div class='bill-card-name'> ${firstName} ${lastName} </div>
        <span class='bill-card-grey'> ... </span>
      </div>
      <div class='name-price-container'>
        <span> ${bill.name} </span>
        <span> ${bill.amount} € </span>
      </div>
      <div class='date-type-container'>
        <span> ${formatDate(bill.date)} </span>
        <span> ${bill.type} </span>
      </div>
    </div>
  `)
}

export const dedcard = (ded) => {
  const firstAndLastNames = ded.email.split('@')[0]
  const firstName = firstAndLastNames.includes('.') ?
    firstAndLastNames.split('.')[0] : ''
  const lastName = firstAndLastNames.includes('.') ?
  firstAndLastNames.split('.')[1] : firstAndLastNames

  return (`
    <div class='ded-card' id='open-ded${ded.id}' data-testid='open-ded${ded.id}'>
      <div class='ded-card-name-container'>
        <div class='ded-card-name'> ${firstName} ${lastName} </div>
        <span class='ded-card-grey'> ... </span>
      </div>
      <div class='name-price-container'>
        <span> ${ded.name} </span>
        <span> ${ded.amount} € </span>
      </div>
      <div class='date-type-container'>
        <span> ${formatDate(ded.date)} </span>
        <span> ${ded.type} </span>
      </div>
    </div>
  `)
}

export const cards = (bills) => {
  return bills && bills.length ? bills.map(bill => card(bill)).join("") : ""
}

export const dedcards = (deds) => {
  return deds && deds.length ? deds.map(ded => card(ded)).join("") : ""
}

export const getStatus = (index) => {
  switch (index) {
    case 1:
      return "pending"
    case 2:
      return "accepted"
    case 3:
      return "refused"
  }
}

export default class {
  constructor({ document, onNavigate, store, bills, deds, localStorage }) {
    this.document = document;
    this.onNavigate = onNavigate;
    this.store = store;

    // Fetch deds if not provided
    if (!deds && this.store) {
      this.getDedsAllUsers().then(fetchedDeds => {
        this.deds = fetchedDeds;

        // Update counts after deds are fetched
        $('#arrow-icon-deds-pending-len').text(filteredDeds(this.deds, "pending").length);
        $('#arrow-icon-deds-accepted-len').text(filteredDeds(this.deds, "accepted").length);
        $('#arrow-icon-deds-refused-len').text(filteredDeds(this.deds, "refused").length);
      });
    } else {
      this.deds = deds;

      // Update counts if deds are already provided
      $('#arrow-icon-deds-pending-len').text(filteredDeds(this.deds, "pending").length);
      $('#arrow-icon-deds-accepted-len').text(filteredDeds(this.deds, "accepted").length);
      $('#arrow-icon-deds-refused-len').text(filteredDeds(this.deds, "refused").length);
    }

    this.selectedTickets = {
      bills: { counter: 0, id: null },
      deds: { counter: 0, id: null },
    };

    // Event listeners for bills and deds sections
    $('#arrow-icon-bills-pending-len').text(filteredBills(bills, "pending").length);
    $('#arrow-icon-bills-accepted-len').text(filteredBills(bills, "accepted").length);
    $('#arrow-icon-bills-refused-len').text(filteredBills(bills, "refused").length);

    $('#arrow-icon-bills-pending').click((e) => this.handleShowTickets(e, bills, 1, 'bills-pending'));
    $('#arrow-icon-bills-accepted').click((e) => this.handleShowTickets(e, bills, 2, 'bills-accepted'));
    $('#arrow-icon-bills-refused').click((e) => this.handleShowTickets(e, bills, 3, 'bills-refused'));

    $('#arrow-icon-deds-pending').click((e) => this.handleShowTickets(e, this.deds, 1, 'deds-pending'));
    $('#arrow-icon-deds-accepted').click((e) => this.handleShowTickets(e, this.deds, 2, 'deds-accepted'));
    $('#arrow-icon-deds-refused').click((e) => this.handleShowTickets(e, this.deds, 3, 'deds-refused'));

    new Logout({ localStorage, onNavigate });
  }

  handleClickIconEye = () => {
    const billUrl = $('#icon-eye-d').attr("data-bill-url")
    const imgWidth = Math.floor($('#modaleFileAdmin1').width() * 0.8)
    $('#modaleFileAdmin1').find(".modal-body").html(`<div style='text-align: center;'><img width=${imgWidth} src=${billUrl} alt="Bill"/></div>`)
    if (typeof $('#modaleFileAdmin1').modal === 'function') $('#modaleFileAdmin1').modal('show')
  }

  handleEditTicket(e, item, items, type) {
    console.log('handleEditTicket triggered for:', item);
    const formUI = DashboardFormUI(item, type);
    console.log('DashboardFormUI output:', formUI);
    $('.dashboard-right-container div').html(formUI);
    $('.vertical-navbar').css({ height: '150vh' });

    $('#icon-eye-d').click(this.handleClickIconEye);
    $(`#btn-accept-${type}`).click((e) => this.handleAcceptSubmit(e, item, type));
    $(`#btn-refuse-${type}`).click((e) => this.handleRefuseSubmit(e, item, type));
  }

  handleAcceptSubmit = (e, item, type) => {
    const newItem = {
      ...item,
      status: 'accepted',
      commentAdmin: $('#commentary2').val()
    };
    console.log(`Accepting ${type}:`, newItem);

    if (type === 'bills') {
      this.updateBill(newItem);
    } else if (type === 'deds') {
      this.updateDed(newItem);
    }

    // TODO: make update list nd length of items

    this.onNavigate(ROUTES_PATH['Dashboard']);
  };

  handleRefuseSubmit = (e, item, type) => {
    const newItem = {
      ...item,
      status: 'refused',
      commentAdmin: $('#commentary2').val()
    };
    console.log(`Refusing ${type}:`, newItem);

    if (type === 'bills') {
      this.updateBill(newItem);
    } else if (type === 'deds') {
      this.updateDed(newItem);
    }

    // TODO: make update list nd length of items

    this.onNavigate(ROUTES_PATH['Dashboard']);
  };

  handleShowTickets(e, items, index, type) {
    if (this.counter === undefined || this.index !== index) this.counter = 0;
    if (this.index === undefined || this.index !== index) this.index = index;
  
    if (this.counter % 2 === 0) {
      console.log(`Expanding ${type}`);
      $(`#arrow-icon-${type}`).css({ transform: 'rotate(0deg)' });

      // Render cards for bills or deds
      const renderedCards = type.includes('bills')
        ? cards(filteredBills(items, getStatus(index)))
        : dedcards(filteredDeds(items, getStatus(index)));

      $(`.status-${type.split('-')[0]}-container`).html(renderedCards);

      // Use event delegation to handle clicks
      $(`.status-${type.split('-')[0]}-container`).off('click', '.bill-card, .ded-card'); // Remove existing listeners
      $(`.status-${type.split('-')[0]}-container`).on('click', '.bill-card, .ded-card', (event) => {
        console.log('Delegated click handler triggered');
        const cardId = $(event.currentTarget).attr('id');
        console.log(`Card clicked: ${cardId}`);
        const itemId = cardId.replace(/^open-(bill|ded)/, '');
        console.log('Extracted itemId:', itemId);
        const item = items.find(i => i.id === itemId || i.id === parseInt(itemId, 10)); // Handle string and number IDs
        console.log('Item found:', item);
        if (item) {
          const formatedType = type.split('-')[0]; // Get the type (bills or deds)
          this.handleEditTicket(event, item, items, formatedType);
        }
      });
      console.log('Items array:', items);
      this.counter++;
    } else {
      console.log(`Collapsing ${type}`);
      $(`#arrow-icon-${type}`).css({ transform: 'rotate(90deg)' });
      $(`.status-${type.split('-')[0]}-container`).html("");
      this.counter++;
    }
  }

  getBillsAllUsers = () => {
    if (this.store) {
      return this.store
      .bills()
      .list()
      .then(snapshot => {
        const bills = snapshot
        .map(doc => ({
          id: doc.id,
          ...doc,
          date: doc.date,
          status: doc.status
        }))
        return bills
      })
      .catch(error => {
        throw error;
      })
    }
  }

  getDedsAllUsers = () => {
    if (this.store) {
      return this.store
        .deds()
        .list()
        .then(snapshot => {
          const deds = snapshot.map(doc => ({
            id: doc.id,
            ...doc,
            date: doc.date,
            status: doc.status
          }));
          return deds;
        })
        .catch(error => {
          throw error;
        });
    }
  }

  // not need to cover this function by tests
  /* istanbul ignore next */
  updateBill = (bill) => {
    if (this.store) {
    return this.store
      .bills()
      .update({data: JSON.stringify(bill), selector: bill.id})
      .then(bill => bill)
      .catch(console.log)
    }
  }

  updateDed = (ded) => {
    if (this.store) {
      return this.store
        .deds()
        .update({ data: JSON.stringify(ded), selector: ded.id })
        .then(ded => ded)
        .catch(console.log)
    }
  }
}
