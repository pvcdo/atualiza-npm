import fs from 'fs'
import updateNotifier from 'update-notifier';
import path from "path"
import walker from "walker"

const initPath = 'D:/Paulo Victor/Estudos/Programação/estudos-nodejs'

let passados = []
  
walker(initPath).on('dir', function(dir, stat) {
    const arr_dir = dir.split('\\') 
    if(arr_dir.includes('node_modules')){
      
      let vai = true
      let arr_dir_node = []
      let pasta = ''
      
      arr_dir.forEach((thePath, i)=>{
        if(thePath === 'node_modules'){
          vai = false
        }
        if(vai){
          if(i > 4){
            pasta += '/' + thePath
          }
          arr_dir_node.push(thePath)
        }
      })

      const pastaPath = path.join(...arr_dir_node)
      if(!passados.includes(pastaPath)){
        passados.push(pastaPath)
        const packageJsonPath = `${pastaPath}\\package.json`
        if(fs.existsSync(packageJsonPath)){
          const packageJson = fs.readFileSync(packageJsonPath)
          if(pasta === '/10_MVC/1-estrutura'){
            console.log(`package.json da pasta ${pasta} --> ` + JSON.stringify(packageJson))
          }
        }else{
          console.log(`Não existe package.json em ${pasta}`)
        }
        
        //const notifier = updateNotifier()
      }
    }
})


