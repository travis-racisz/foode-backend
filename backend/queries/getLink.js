const { Links } = require('../utils/sequelize') 

const getLink = async ({link}) => { 

    const foundLink = await Links.findOne({ 
        where: { 
            generatedlink: link
        }
    })

        const now = Date.now()
        const d1 = Date.parse((foundLink.createdAt).toString())
        
        if(d1 + 3600000 < now){
            return new Error("this link is expired")
            
        }  

        if(foundLink){ 
            return foundLink

        }

        if(!foundLink){ 
            return new Error("invalid code")
        }
        
    
}

module.exports = getLink