const express = require('express');
const check = require('express-validator/check');
const Authorization = require('../../middlewares/authorization');
const ControllerHandler = require('../../middlewares/controller.handler');
const UserController = require('../../controllers/users.controller');

var router = express.Router();

// api/users ---------------------------------------------------------------------

router.get('/',
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUsers,
        (req, res, next) => [
            res.locals.auth.sub,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);
router.post('/',
    Authorization,
    ControllerHandler(
        UserController.newUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);
router.delete('/',
    Authorization,
    ControllerHandler(
        UserController.deleteUser,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);
router.get('/info',
    Authorization,
    ControllerHandler(
        UserController.getUserInfo,
        (req, res, next) => [
            res.locals.auth.sub
        ]
    )
)
// api/users/garments ------------------------------------------------------------

router.get('/garments',
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUserGarments,
        (req, res, next) => [
            res.locals.auth.sub,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined
        ]
    )
);
router.post('/garments',
    Authorization,
    ControllerHandler(
        UserController.addUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body
        ]
    )
);
router.put('/garments/:id',
    Authorization,
    ControllerHandler(
        UserController.updateUserGarmentTags,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
            req.body
        ]
    )
);
router.delete('/garments/:id',
    Authorization,
    ControllerHandler(
        UserController.deleteUserGarment,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
        ]
    )
);

router.get('/garments/generateOutfits',
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.generateOutfits,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body,
            req.query.limit ? parseInt(req.query.limit) : undefined,
            req.query.offset ? parseInt(req.query.offset) : undefined,
            req.query.random,
        ]
    )
);

// api/users/outfits ------------------------------------------------------------

router.post('/outfits',
    Authorization,
    ControllerHandler(
        UserController.addOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.body
        ]
    )
)

router.put('/outfits/:id',
    Authorization,
    ControllerHandler(
        UserController.updateOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id,
            req.body
        ]
    )
)

router.delete('/outfits/:id',
    Authorization,
    ControllerHandler(
        UserController.deleteOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

router.post('/outfits/wear/:id',
    Authorization,
    ControllerHandler(
        UserController.wearOutfit,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

// api/users/history ------------------------------------------------------------

router.get('/history',
    Authorization, [
        check.query('limit').isInt({min: 0}).optional(),
        check.query('offset').isInt({min: 0}).optional()
    ],
    ControllerHandler(
        UserController.getUserHistory,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
);

router.delete('/history/all',
    Authorization,
    ControllerHandler(
        UserController.clearHistory,
        (req, res, next) => [
            res.locals.auth.sub,
        ]
    )
)

router.delete('/history/:id',
    Authorization,
    ControllerHandler(
        UserController.deleteHistoryItem,
        (req, res, next) => [
            res.locals.auth.sub,
            req.params.id
        ]
    )
)

// ------------------------------------------------------------------------------

module.exports = router;
