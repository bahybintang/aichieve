(this.webpackJsonpeciv=this.webpackJsonpeciv||[]).push([[0],{23:function(e,t,a){e.exports=a(35)},28:function(e,t,a){},29:function(e,t,a){},35:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(20),o=a.n(r),c=a(12),s=(a(28),a(5)),u=a(6),i=a(8),m=a(7),h=a(9),p=a(10),d=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement("center",null,l.a.createElement("div",null,l.a.createElement("p",null,l.a.createElement("h1",null,"Home"))))}}]),t}(n.Component),E=a(14),b=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target,n=t.value,l=t.name;a.setState(Object(E.a)({},l,n))},a.onSubmit=function(e){e.preventDefault(),fetch("http://localhost:8080/auth/register",{method:"POST",body:JSON.stringify(a.state),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status)throw new Error(e.error);a.props.history.push("/")})).catch((function(e){console.error(e),alert("Gagal Register")}))},a.state={name:"",username:"",password:""},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement("center",null,l.a.createElement("form",{onSubmit:this.onSubmit,className:"formStyle"},l.a.createElement("h1",null,"Register"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",{htmlFor:"name"},"Nama"),l.a.createElement("input",{type:"text",name:"name",placeholder:"",value:this.state.name,onChange:this.handleInputChange,required:!0}),l.a.createElement("span",null,"Masukkan Nama Anda!")),l.a.createElement("li",null,l.a.createElement("label",{htmlFor:"username"},"User Name"),l.a.createElement("input",{type:"text",name:"username",placeholder:"",value:this.state.username,onChange:this.handleInputChange,required:!0}),l.a.createElement("span",null,"Masukkan User Name Anda!")),l.a.createElement("li",null,l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",name:"password",placeholder:"",value:this.state.password,onChange:this.handleInputChange,required:!0}),l.a.createElement("span",null,"Masukkan Password Anda!")),l.a.createElement("li",null,l.a.createElement("input",{type:"submit",Value:"Submit"})))))}}]),t}(n.Component),f=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(m.a)(t).call(this,e))).handleInputChange=function(e){var t=e.target,n=t.value,l=t.name;a.setState(Object(E.a)({},l,n))},a.onSubmit=function(e){e.preventDefault(),fetch("http://localhost:8080/auth/login",{method:"POST",body:JSON.stringify(a.state),headers:{"Content-Type":"application/json"}}).then((function(e){if(200!==e.status)throw new Error(e.error);a.props.history.push("/"),e.json()})).then((function(e){console.log(e)})).catch((function(e){console.error(e),alert("Gagal Login")}))},a.state={username:"",password:""},a}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement("center",null,l.a.createElement("form",{onSubmit:this.onSubmit,className:"formStyle"},l.a.createElement("h1",null,"Login"),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("label",{htmlFor:"username"},"User Name"),l.a.createElement("input",{type:"text",name:"username",placeholder:"",value:this.state.username,onChange:this.handleInputChange,required:!0}),l.a.createElement("span",null,"Masukkan User Name Anda!")),l.a.createElement("li",null,l.a.createElement("label",{htmlFor:"password"},"Password"),l.a.createElement("input",{type:"password",name:"password",placeholder:"",value:this.state.password,onChange:this.handleInputChange,required:!0}),l.a.createElement("span",null,"Masukkan Password Anda!")),l.a.createElement("li",null,l.a.createElement("input",{type:"submit",value:"Submit"})))))}}]),t}(n.Component),g=(a(29),function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("ul",{className:"menu"},l.a.createElement("li",{className:"menuItem"},l.a.createElement(c.b,{to:"/"},"Home")),l.a.createElement("li",{className:"menuItem"},l.a.createElement(c.b,{to:"/login"},"Login")),l.a.createElement("li",{className:"menuItem"},l.a.createElement(c.b,{to:"/register"},"Register"))),l.a.createElement(p.c,null,l.a.createElement(p.a,{path:"/",exact:!0,component:d}),l.a.createElement(p.a,{path:"/login",component:f}),l.a.createElement(p.a,{path:"/register",component:b})))}}]),t}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(c.a,null,l.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[23,1,2]]]);
//# sourceMappingURL=main.bf06e72e.chunk.js.map