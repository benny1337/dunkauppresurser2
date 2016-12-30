using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dunkauppresurser2.Hubs
{
    public class Broadcaster : Hub<IBroadcaster>
    {
        public override Task OnConnected()
        {
            return Clients.Client(Context.ConnectionId).SetConnectionId(Context.ConnectionId);
        }

        public Task Subscribe(int fileid)
        {
            return Groups.Add(Context.ConnectionId, fileid.ToString());
        }

        public Task Unsubscribe(int fileid)
        {
            return Groups.Remove(Context.ConnectionId, fileid.ToString());
        }
    }

    public interface IBroadcaster
    {
        Task SetConnectionId(string connectionId);
        Task PercentageWasChanged(int percent);
    }
}
