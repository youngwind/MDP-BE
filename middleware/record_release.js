// 记录组件版发包记录
module.exports = function () {
    return function (req, res, next) {
        var componentId = req.query.componentId;
        console.log(componentId);
        Release.find({
            where: {
                componentId: componentId
            },
            order: 'createdAt DESC'

        }).then(function (data) {
            var componentVersion;

            if (!data) {
                componentVersion = '1.0.0';
            } else {
                componentVersion = (data.componentVersion.split('.').join('') * 1 + 1).toString().split('').join('.');
            }
            Release.create({
                componentId: componentId,
                componentVersion: componentVersion
            }).then(function (data) {
                req.query.nextVersion = componentVersion;
                next()
            });
        });
    }
};