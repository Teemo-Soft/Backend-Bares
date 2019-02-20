const { User, Group, Role, Bar, Image } = require('../models')


module.exports = {
  Query: {
    getAll(obj, args, context) {
      if (!context.user) throw new Error('Invalid user')
      return User.findAll({
          include: [
              {
                  model: Bar,
                  as: 'Bars',
                  attributes: ['id', 'name','description'],
                  include:[{
                    model: Image,
                    as: 'Images',
                    attributes: ['id', 'barId','urlImage'],
                  }]
              },
          ],
          attributes: ['id', 'names', 'lastnames', 'email'],
      }).then(data =>
         data.map(e => {
              e.bars = e.Bars.map(bar => {
                bar.images = bar.Images
                return bar
              })
              return e
          }) 
      )
    },

  },

  Mutation: {
    async addBar(obj, args) {
      const { name, description, address, userId } = args
      const bar = await Bar.findOne({
        where: { name },
        attributes: ['id', 'name', 'description', 'address', 'userId'],
      })
      if (bar) throw new Error('Bar already created.')
      const barCreated = await Bar.create(args)
      return barCreated
    }
  },
}
