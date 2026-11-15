
const $=id=>document.getElementById(id);
const steps=[
  ["Mèo cắt một dải giấy…","s1",15],
  ["Mèo thắt nút dải giấy…","s2",45],
  ["Mèo gấp các cạnh lại…","s3",75],
  ["Mèo bóp nhẹ cho sao phồng lên…","star4",100]
];
let timers=[],started=false;
function show(id){["s1","s2","s3","star4"].forEach(s=>$(s).classList.toggle("on",s===id))}
steps.forEach((s,i)=>timers.push(setTimeout(()=>{$("status").textContent=s[0];show(s[1]);$("prog").style.width=s[2]+"%"},i*1900)));
timers.push(setTimeout(()=>{$("status").textContent="Xong rồi! Giờ cùng ôn lượng giác nhé 🌟"},steps.length*1900));
timers.push(setTimeout(startQuiz,steps.length*1900+1500));
$("skip").onclick=startQuiz;
function startQuiz(){
  if(started)return;started=true;timers.forEach(clearTimeout);
  $("intro").classList.add("hidden");$("quiz").classList.remove("hidden");window.scrollTo(0,0);render();
}

const Q=[
 {t:"Công thức",q:"sin²α + cos²α = ?",o:["1","0","2","sin2α"],a:0,e:"Đây là hệ thức cơ bản: sin²α + cos²α = 1."},
 {t:"Công thức",q:"tanα bằng biểu thức nào?",o:["sinα / cosα","cosα / sinα","sinα · cosα","1 / sinα"],a:0,e:"tanα = sinα / cosα (với cosα ≠ 0)."},
 {t:"Công thức",q:"1 + tan²α = ?",o:["1 / cos²α","1 / sin²α","cos²α","tan2α"],a:0,e:"1 + tan²α = 1 / cos²α."},
 {t:"Công thức",q:"sin2α = ?",o:["2sinα·cosα","cos²α − sin²α","2sinα","sin²α + cos²α"],a:0,e:"Công thức nhân đôi: sin2α = 2sinα·cosα."},
 {t:"Công thức",q:"cos(a + b) = ?",o:["cosa·cosb − sina·sinb","cosa·cosb + sina·sinb","sina·cosb + cosa·sinb","cosa + cosb"],a:0,e:"cos(a + b) = cosa·cosb − sina·sinb (cộng thì dấu trừ)."},
 {t:"Giá trị đặc biệt",q:"sin30° + cos60° = ?",o:["1","1/2","√3","0"],a:0,e:"sin30° = 1/2 và cos60° = 1/2, tổng bằng 1."},
 {t:"Tính toán",q:"Cho cosα = 3/5 với α nhọn. Tính sinα.",o:["4/5","3/4","2/5","5/4"],a:0,e:"sin²α = 1 − 9/25 = 16/25, α nhọn nên sinα = 4/5."},
 {t:"Tính toán",q:"Cho sinα = 1/3. Tính cos2α.",o:["7/9","1/9","2/3","−7/9"],a:0,e:"cos2α = 1 − 2sin²α = 1 − 2/9 = 7/9."},
 {t:"Đổi đơn vị",q:"Đổi 150° sang radian.",o:["5π/6","2π/3","3π/4","π/6"],a:0,e:"150° = 150·π/180 = 5π/6."},
 {t:"Góc liên quan",q:"cos(180° − α) = ?",o:["−cosα","cosα","sinα","−sinα"],a:0,e:"Hai góc bù nhau có cosin đối nhau: cos(180° − α) = −cosα."},
 {t:"Tập xác định",q:"tập xác định của y = tanx là?",o:["D = R\\ {π/2 + kπ}", "D = R\\ {π + kπ}", "D = R\\ {kπ}", "D = R"],a:0,e:"tanx = sinx/cosx nên tanx xác định khi cosx ≠ 0, x ≠ π/2 + kπ ( k∈ℤ) " },
 {t: "Phương trình",q:"cosx = 1/2 có nghiệm là ?",o:["± π/6 + k2π ","± π/3 + k2π ","π/3 + k2π ","π/6 + k2π "],a:1,e:"Bấm máy tính ta có 1/2 = cosπ/3 => cosx = cosπ/3 => x = ± π/3 + k2π "}
];
let i=0,sc=0,done=false;
function shuf(a){a=a.slice();for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]]}return a}
function render(){
  const c=Q[i];done=false;
  $("num").textContent="Câu "+(i+1)+"/"+Q.length;$("score").textContent="Điểm: "+sc;
  $("tag").textContent=c.t;$("q").textContent=c.q;$("fb").textContent="";$("fb").className="";
  $("next").classList.add("hidden");$("opts").innerHTML="";
  shuf(c.o.map((x,k)=>({x,r:k===c.a}))).forEach(op=>{
    const b=document.createElement("button");b.className="opt";b.textContent=op.x;
    b.onclick=()=>pick(b,op.r);b.dataset.r=op.r;$("opts").appendChild(b)});
}
function pick(b,r){
  if(done)return;done=true;
  document.querySelectorAll(".opt").forEach(x=>{x.disabled=true;if(x.dataset.r==="true")x.classList.add("ok")});
  if(r){sc++;$("fb").className="ok";$("fb").textContent="Chính xác! "+Q[i].e}
  else{b.classList.add("bad");$("fb").className="bad";$("fb").textContent="Chưa đúng. "+Q[i].e}
  $("score").textContent="Điểm: "+sc;
  $("next").textContent=i===Q.length-1?"Xem kết quả":"Câu tiếp theo";$("next").classList.remove("hidden");
}
$("next").onclick=()=>{
  if(i<Q.length-1){i++;render();return}
  document.querySelector("#qcard").classList.add("hidden");$("result").classList.remove("hidden");
  $("final").textContent=sc+"/"+Q.length;
  $("msg").textContent=sc>=11?"Tuyệt vời! Mèo tặng bạn ngôi sao may mắn 🌟":sc>=8?"Khá tốt! Ôn lại các câu sai là chắc chắn hơn.":"Cố lên! Xem lại công thức rồi thử lần nữa nhé.";
};
$("again").onclick=()=>{i=0;sc=0;$("result").classList.add("hidden");$("qcard").classList.remove("hidden");render()};
