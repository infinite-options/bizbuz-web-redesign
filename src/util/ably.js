import Ably from "ably/callbacks";

const ABLY_API_KEY = process.env.REACT_APP_ABLY_API_KEY;

const useAbly = (() => {
  let channel = null;

  return (channelId) => {
    const channelName = `FindMe/${channelId}`;
    if (!channel || channel.name !== channelName) {
      const ably = new Ably.Realtime(ABLY_API_KEY);
      channel = ably.channels.get(channelName);
      channel.attach((err) => {
        if (err) console.error("Error when attaching: " + err.message);
      });
    }

    const publish = (message) => {
      channel.publish({ data: message }, (err) => {
        if (err) console.error("Error when publishing: " + err.message);
      });
    };

    const isAttendeePresent = (clientId, callback) => {
      channel.presence.get({ clientId }, (err, members) => {
        if (err) console.error("Error when checking presence: " + err.message);
        if (members.length > 0) callback(members[0]);
      });
    };

    const addAttendee = (clientId, clientData) => {
      channel.presence.enterClient(clientId, clientData, (err) => {
        if (err) console.error("Error when entering: " + err.message);
      });
    };

    const updateAttendee = (clientId, clientData) => {
      channel.presence.updateClient(clientId, clientData, (err) => {
        if (err) console.error("Error when updating: " + err.message);
      });
    };

    const removeAttendee = (clientId, clientData) => {
      channel.presence.leaveClient(clientId, clientData, (err) => {
        if (err) console.error("Error when leaving: " + err.message);
      });
    };

    const onAttendeeUpdate = (callback) => {
      channel.presence.subscribe(["enter", "update", "leave"], callback);
    };

    const subscribe = (listener) => {
      channel.subscribe(listener);
    };

    const unSubscribe = () => {
      channel.presence.unsubscribe();
      channel.unsubscribe();
    };

    const detach = () => {
      channel.detach((err) => {
        if (err) console.error("Error when detaching: " + err.message);
        // else channel.release();
      });
    };

    return {
      publish,
      subscribe,
      addAttendee,
      updateAttendee,
      removeAttendee,
      isAttendeePresent,
      onAttendeeUpdate,
      unSubscribe,
      detach,
    };
  };
})();

export default useAbly;
