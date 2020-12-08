// When bbutton is clicked in index 
$("#btnSum").click(function(){
    const data = {
        num1: $("#num1")[0].value,
        num2: $("#num2")[0].value
    }
   const post = $.post("http://localhost:3000/sum", data);
   post.done(handleDone);

});

function handleDone(response, status, xhr){
    const result = response.result;
    $(`<div>${result}</div><a href='/'> Clear </a>`).insertAfter("#mainForm");
}

