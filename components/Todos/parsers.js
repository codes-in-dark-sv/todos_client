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