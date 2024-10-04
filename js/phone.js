const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phone)
    displayPhone(phones, isShowAll);
}

const displayPhone = (phones, isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    const showAllContainer = document.getElementById('show-all-container');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    }
    else {
        showAllContainer.classList.add('hidden')
    }
    // console.log('is show all',isShowAll)
    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }
    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100  p-4 shadow-xl`;
        phoneCard.innerHTML = `
        <figure>
                    <img src="${phone.image}"
                        alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">${phone.phone_name}</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-center">
                        <button onclick="handleShowDetail('${phone.slug}'); show_detail_modal.showModal()"
                         class="btn btn-primary">Show Detail</button>
                    </div>
                </div>
                `;
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner
    toggleLoadingSpinner(false)
}


const handleShowDetail = async (id) => {
    // console.log('show detail',id)
    // load single phone  data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data
    showPhoneDetail(phone)
}
const showPhoneDetail = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('show-detail-phone-name')
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt =>
        <p><span>Storage:${phone.mainFeature,storage}</span></P>
    
    
    `

    show_detail_modal.showModal()
}
// handle Search

const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)

}
// // handle search recap
//  const handleSearch2= () =>{
//     toggleLoadingSpinner(true);
//     const searchField =document.getElementById('search-field2')
//     const searchText =searchField.value;
//     console.log(searchText)
//     loadPhone(searchText);
//  }

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    }
    else {
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true)
}

// loadPhone()