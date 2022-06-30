import fs from 'fs'
import updateNotifier from 'update-notifier';
import path from "path"
import walker from "walker"

const inicio = 'D:/Paulo Victor/Estudos/Programação/estudos-nodejs'

let passados = []

async function andar(){

  await walker(inicio).on('dir', function(dir, stat) {
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
  
      const pasta = path.join(...arr_dir_node)
      if(!passados.includes(pasta)){
        const packageJson = fs.readFileSync(`${pasta}\\package.json`)
        //const notifier = updateNotifier()
        console.log(packageJson[0,10])
        passados.push(pasta)
      }
    }
  })
}

andar()

