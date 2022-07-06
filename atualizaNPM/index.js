const fs = require('fs')
const path = require("path")
const walker = require("walker")
const { exec }= require("child_process")

const initPath = 'D:/Paulo Victor/Estudos/Programação/estudos-nodejs'

let pastas = []

walker(initPath).on('dir', function(dir, stat) {
  const arr_dir = dir.split('\\') 
  if(arr_dir.includes('node_modules')){
    
    let vai = true
    let arr_dir_node = []
    
    arr_dir.forEach((thePath, i)=>{
      if(thePath === 'node_modules'){
        vai = false
      }
      if(vai){
        arr_dir_node.push(thePath)
      }
    })

    const pastaPath = path.join(...arr_dir_node)
    if(!pastas.includes(pastaPath)){
      pastas.push(pastaPath)
    }
  }
}).on('end', function() {
  //console.log(pastas)
  pastas.forEach((pastaPath) => {

    const pastaNameArr = [] 
    pastaPath.split('\\')
      .forEach((parte,i)=>{
        if(i>4){
          pastaNameArr.push(parte)
        }
      })
    const pastaName = pastaNameArr.join('/')
  
    const packageJsonPath = `${pastaPath}\\package.json`
    //if(pastaName === '10_MVC/8-editar-dados'){
      console.log(pastaName)
      if(fs.existsSync(packageJsonPath)){
        
        /*const packageJsonBuffer = fs.readFileSync(packageJsonPath)
        const packageJson = JSON.parse(packageJsonBuffer)*/
        
        //const shell1 = `cd ${pastaPath}`
        const shell2 = 'npm-upgrade';

        exec(shell2,{cwd: pastaPath},(error,stdout,stderr) => {
          console.log(`Executando ${shell2} em ${pastaName}`)
          if (error) {
            console.log(`ERROOOOOOOOOO: ${error.message}`);
            return;
          }
          if (stderr) {
            console.log(`STDERRRRRRRR: ${stderr}`);
            return;
          }
          console.log(`${stdout}`);
        })
      }
    //}
  })
})



