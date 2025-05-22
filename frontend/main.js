// modal
const openModel = document.getElementById('create-button');
const closeModal = document.getElementById('closeModal');
const otherOpenModal = document.getElementById('otherOpenModal')
const modal = document.getElementById('modal');

openModel.addEventListener('click',()=>{
    modal.classList.add("open")
})
otherOpenModal.addEventListener('click',()=>{
    modal.classList.add('open')
})
closeModal.addEventListener('click',()=>{
    modal.classList.remove("open")
})

//Backend logic
document.querySelector('.inner-modal').addEventListener('submit', sendData)
function sendData(e){
    e.preventDefault();

    const Enteredpayload = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    due_date: document.getElementById('due-date').value,
    priority: document.getElementById('priority').value,
    status: document.getElementById('status').value,
    category: document.getElementById('Category').value
}

axios.post('http://localhost:3000/task', Enteredpayload)
.then(response => {alert('New Todo Created')})
.catch(err=>{
    console.error("Error:", err.response?.data || err.message);
    alert('Failed to Make a new todo ')
})
axios.get()
// axios.post('http://localhost:3000/', )
// .then(response => {console.loh(response)})
// .catch(err=>{
//     console.error("Error:", err.response?.data || err.message);
// })
}

