let dışdonaınımurunu=["kasa","2000","monitör","3000","fare","300","klavye","500","yazıcı","1000"];
let içdonanımurunu=["ana kart","1000","ram","500","işlemci","800","ses kartı","500","ekran kartı","750"];
let sesdonanımurunu=["mikrofon","250","kulaklık","500","hoparlör","600"];
let i;
let urunAciklama,urunSecenek;
let eklenecekler=[];
let fiyatlar=[];
let listeSepet=document.getElementById("sepetMarket");
let toplamTutar=0;
const kod="fare123";
for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   
function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}
function urunleriGetir(){
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }
    if(document.getElementById("dışdonaınımurunu").checked)
    {
        for(i=0;i<dışdonaınımurunu.length;i=i+2)
        {
            olustur();
            urunSecenek.value=dışdonaınımurunu[i+1];
            urunAciklama.innerHTML=dışdonaınımurunu[i]; 
        }
    }
    else if(document.getElementById("içdonanımurunu").checked)
    {
        for(i=0;i<içdonanımurunu.length;i=i+2)
        {
        olustur();
        urunSecenek.value=içdonanımurunu[i+1];
        urunAciklama.innerHTML=içdonanımurunu[i];
        }
    }
    else if(document.getElementById("sesdonanımurunu").checked)
    {
        for(i=0;i<sesdonanımurunu.length;i=i+2)
        {
        olustur();
        urunSecenek.value=sesdonanımurunu[i+1];
        urunAciklama.innerHTML=sesdonanımurunu[i];
        }
    }
}
function sepeteEkle(){
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");
    let adet=document.getElementById("urunAdet").value;
        eklenecekler=[];
        fiyatlar=[];
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=(Number(listeUrunlerFiyat[i].value)*adet);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        for(let j=0;j<eklenecekler.length;j++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=eklenecekler[j];
            sepeteEklenecekUrun.value=fiyatlar[j];
        }
    }

    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}
function sepettenCikar(){
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}
function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}
function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod == kod)
    {
        if(toplamTutar>=200)
        {
            toplamTutar=toplamTutar-80;
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}