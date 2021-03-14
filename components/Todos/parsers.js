function concatZero(value){
      var temp = String(value)
      if(temp.length==1)
            return "0"+temp 
      else
            return temp
}
export const date_parser = (myDate) =>{
      var result=  new Date(myDate)
      var obj = {
            date:concatZero(result.getDate()),
            month:concatZero(result.getMonth()+1),
            year:result.getFullYear(),
            hrs:concatZero(result.getHours()),
            mins:concatZero(result.getMinutes())
      }
      return obj.hrs+":"+obj.mins+", "+obj.date+"-"+obj.month+"-"+obj.year
} 

export const text_parser = (text)=>{
      var modify_text = ""
      if(text.length>40){
            for(var i = 0; i< text.length ; i++){
                  modify_text+=text[i]
                  if(i%30 && i>1){
                        modify_text+="\n"
                  }
            }
            return modify_text
      } 
      return text
      
}