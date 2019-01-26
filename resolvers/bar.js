const { User, Group, Role, Bar } = require('../models')


module.exports = {
    Query: {
        Bars(obj, args, context) {
            //if (!context.user) throw new Error('Invalid user')
            return Bar.findAll({
                include: [{
                    model: User,
                    as: 'users' 
                  }]
            })
        }
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
