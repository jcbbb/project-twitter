const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const Thread = require('../models/Thread');
//const ThreadParticipant = require('../models/ThreadParticipant');
const Message = require('../models/Message');

const router = Router();

router.post('/thread/new', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { selectedUsers, threadId } = req.body;

        const candidateThread = await Thread.findOne({ thread_id: threadId });
        if (candidateThread) {
            return res.status(409).json({ message: 'Thread already exists' });
        }
        const participantIds = selectedUsers.map((user) => user._id);

        const thread = new Thread({
            initiated_by: id,
            thread_id: threadId,
            participants: participantIds,
        });

        await thread.save();

        res.json({ message: 'Successfully created new thread and added participants', status: 200, thread });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

router.post('/message/new', verifyToken, async (req, res) => {
    try {
        const io = req.io;
        const { message_text, threadId } = req.body;
        const { id } = req.user;
        const message = new Message({
            sender_id: id,
            thread_id: threadId,
            message_text,
        });
        io.to(threadId).emit('thread message', message);
        await message.save();

        res.json({ message: 'New message created', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

router.get('/messages', verifyToken, async (req, res) => {
    try {
        const { threadId } = req.query;
        const messages = await Message.find({ thread_id: threadId });
        res.json({ message: 'Successfully retrieved all messages for given threadId', status: 200, messages });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

router.get('/threads', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const threads = await Thread.find({ participants: id }).populate('participants');

        res.json({ message: 'Retrieved all threads', status: 200, threads });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
