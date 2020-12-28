var profile_details, profile_form, profile_email, profile_password,
    profile_username, profile_logo, name_li, email_li, logo_img,
    followers_li, images_showed;

profile_details = document.querySelector('#profile-details');
profile_form = document.querySelector('#profile-form');
profile_email = document.querySelector('#profile-email');
profile_username = document.querySelector('#profile-username');
profile_logo = document.querySelector('#profile-logo');
name_li = document.querySelector('#name-li');
email_li = document.querySelector('#email-li');
logo_img = document.querySelector('#logo-img');
followers_li = document.querySelector('#followers-li');
images_showed = 0;

profile_form.addEventListener('submit', (e)=>{
    e.preventDefault();
    changeProfile(localStorage.getItem("email"));
})

profile_email.value = localStorage.getItem("email");

name_li.textContent = localStorage.getItem("name");
email_li.textContent = localStorage.getItem("email");
logo_img.setAttribute('src', localStorage.getItem("logoUrl"))
followers_li.textContent = localStorage.getItem("followers");

db.collection('images').where('publisher', '==', localStorage.getItem("email")).orderBy('rating', 'desc').get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
        if(images_showed < 5){
            let img = document.createElement('img');
            img.setAttribute('src', doc.data().imageUrl);
            img.style.height ='300px';
            img.style.borderRadius = '15px';
            img.style.marginLeft = '30px';
            img.style.marginBottom = '20px';
            document.body.appendChild(img);
            images_showed++
        }
    })
})

db.collection('accounts').where('id', '==', localStorage.getItem("email")).get().then(snapshot=>{
    snapshot.docs.forEach(doc=>{
        profile_username.value = doc.data().name;
        document.getElementById('profile-username').setAttribute('class', 'active')
        profile_logo.value = doc.data().logoUrl;
    })
})

changeProfile = async (email) => {
    await db.collection('accounts').where('id', '==', email).get().then(snapshot=>{
        snapshot.docs.forEach(doc=>{
            db.collection('accounts').doc(doc.id).update({
                name: profile_username.value,
                logoUrl: profile_logo.value,
            })
        })
        localStorage.setItem("name", profile_username.value);
        localStorage.setItem("logoUrl", profile_logo.value);
    })
    profile_form.reset();
    M.Modal.getInstance(profile_details).close();
}