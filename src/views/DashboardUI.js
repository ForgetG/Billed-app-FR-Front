import VerticalLayout from './VerticalLayout.js'
import ErrorPage from "./ErrorPage.js"
import LoadingPage from "./LoadingPage.js"
import BigBilledIcon from '../assets/svg/big_billed.js'
import { filteredBills, filteredDeds } from '../containers/Dashboard.js'
import ArrowIcon from '../assets/svg/arrow.js'

export default ({ data, loading, error }) => {

  if (loading) {
    return LoadingPage()
  } else if (error) {
    return ErrorPage(error)
  }

  const toggleContainerVisibility = (iconId, containerId) => {
    const icon = document.getElementById(iconId);
    const container = document.getElementById(containerId);

    if (icon && container) {
      icon.addEventListener('click', () => {
        const isHidden = container.style.display === 'none' || !container.style.display;
        container.style.display = isHidden ? 'block' : 'none';
      });
    }
  };

  setTimeout(() => {
    toggleContainerVisibility('arrow-icon-bills-pending', 'status-bills-container-pending');
    toggleContainerVisibility('arrow-icon-bills-accepted', 'status-bills-container-accepted');
    toggleContainerVisibility('arrow-icon-bills-refused', 'status-bills-container-refused');
    toggleContainerVisibility('arrow-icon-deds-pending', 'status-deds-container-pending');
    toggleContainerVisibility('arrow-icon-deds-accepted', 'status-deds-container-accepted');
    toggleContainerVisibility('arrow-icon-deds-refused', 'status-deds-container-refused');
  }, 0);

  return (`
    <div class='layout'>
      ${VerticalLayout(120)}
      <div class='dashboard-content'>

        <!-- Bills Section -->
        <div class='bills-feed'>
          <h2>Bills</h2>
          <div class='status-bills-header'>
            <h3> En attente (${filteredBills(data && data.bills, "pending").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-bills-pending' data-testid='arrow-icon-bills-pending'>${ArrowIcon}</span>
          </div>
          <div class='status-bills-container' id='status-bills-container-pending' style='display: none;'></div>

          <div class='status-bills-header' style='margin-top: 20px;'>
            <h3> Validé (${filteredBills(data && data.bills, "accepted").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-bills-accepted' data-testid='arrow-icon-bills-accepted'>${ArrowIcon}</span>
          </div>
          <div class='status-bills-container' id='status-bills-container-accepted' style='display: none;'></div>

          <div class='status-bills-header' style='margin-top: 20px;'>
            <h3> Refusé (${filteredBills(data && data.bills, "refused").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-bills-refused' data-testid='arrow-icon-bills-refused'>${ArrowIcon}</span>
          </div>
          <div class='status-bills-container' id='status-bills-container-refused' style='display: none;'></div>
        </div>

        <!-- Deds Section -->
        <div class='deds-feed' style='margin-top: 40px;'>
          <h2>Deds</h2>
          <div class='status-deds-header'>
            <h3> En attente (${filteredDeds(data && data.deds, "pending").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-deds-pending' data-testid='arrow-icon-deds-pending'>${ArrowIcon}</span>
          </div>
          <div class='status-deds-container' id='status-deds-container-pending' style='display: none;'></div>

          <div class='status-deds-header' style='margin-top: 20px;'>
            <h3> Validé (${filteredDeds(data && data.deds, "accepted").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-deds-accepted' data-testid='arrow-icon-deds-accepted'>${ArrowIcon}</span>
          </div>
          <div class='status-deds-container' id='status-deds-container-accepted' style='display: none;'></div>

          <div class='status-deds-header' style='margin-top: 20px;'>
            <h3> Refusé (${filteredDeds(data && data.deds, "refused").length}) </h3>
            <span class='arrow-icon' id='arrow-icon-deds-refused' data-testid='arrow-icon-deds-refused'>${ArrowIcon}</span>
          </div>
          <div class='status-deds-container' id='status-deds-container-refused' style='display: none;'></div>
        </div>

        <div class="dashboard-right-container">
          <h3> Validations </h3>
          <div><div id="big-billed-icon" data-testid="big-billed-icon"> ${BigBilledIcon} </div></div>
        </div>
      </div>
    </div>`
  )
}