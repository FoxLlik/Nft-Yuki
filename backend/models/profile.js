
var mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema(
{

    metaMaskToken:
    {
        type: String,
        required: false,
    },
    username:
    {
        type: String,
        required: false,
    },
    uniqueName:
    {
        type: String,
        required: false
    },
    profileImage:
    {
        type: String,
        required: false
    },
    backgroundImage:
    {
        type: String,
        required: false
    },
    followingCount:
    {
        type: Number,
        required: false,
        default: 0
    },
    followersCount:
    {
        type: Number,
        required: false,
        default: 0
    },
    following:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: this,
            required: false
        }
    ],
    followers:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: this,
            required: false
        }
    ],
    facebook:
    {
        name:
        {
            type: String,
            required: false
        },
        url:
        {
            type: String,
            required: false
        }
    },
    youtube:
    {
        name:
        {
            type: String,
            required: false
        },
        url:
        {
            type: String,
            required: false
        }
    },
    instagram:
    {
        name:
        {
            type: String,
            required: false
        },
        url:
        {
            type: String,
            required: false
        }
    },
    twitter:
    {
        name:
        {
            type: String,
            required: false
        },
        url:
        {
            type: String,
            required: false
        }
    },
    website:
    {
        name:
        {
            type: String,
            required: false
        },
        url:
        {
            type: String,
            required: false
        }
    },
    discord:
    {
        name:
        {
            type: String,
            required: false
        }
    },
    bio:
    {
        type: String,
        required: false
    },
    checkNewMember: {
        type: Boolean,
        default: false,
        required: false
    }

    // TODO: Collection, created, owned

}, {
    timestamps: true
})

module.exports = mongoose.model('Profile', ProfileSchema);
