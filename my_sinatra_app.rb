class MySinatraApp < Sinatra::Base
  # state 1: Waiting
  # state 2: Waiting and second player
  # state 3: Game_on after 3 seconds
  require "debugger"
  set :server, 'thin'
  set :channels, []
  get '/' do
    if !request.websocket?
      redirect "/index.html"
      #erb :index
    else
      request.websocket do |ws|
        ws.onopen do
          if settings.channels.empty?
            settings.channels << {:id => 1, :sockets => [ws]}
            ws.send({:id => 1,:state => 1, :car_id => 1}.to_json)
          else
            last_channel = settings.channels.last
            if last_channel[:sockets].size == 2
              last_id = last_channel[:id] + 1
              settings.channels << {:id => last_id, :sockets => [ws]}
              ws.send({:id => last_id, :state => 1, :car_id => 1}.to_json)
            else
              settings.channels.last[:sockets] << ws
              settings.channels.last[:sockets].first.send({:state => 2}.to_json)
              ws.send({:id => last_channel[:id], :state => 2, :car_id => 2}.to_json)
            end
          end
        end
        ws.onmessage do |msg|
          params = JSON.parse(msg)
          if id = params["id"]
            channels = settings.channels
            # index = channels.index {|chan| chan[:id] == id}
            # channel = channels[index]
            index = channels.index {|channel| channel[:id] == id}
            channel = channels.at(index)
          end
          if channel
            EM.next_tick { channel[:sockets].each{|s| s.send({:evented => params["evented"]}.to_json) } }
          else
            EM.next_tick {ws.send({:error => true}.to_json)}
          end
        end
        ws.onclose do
          warn("wetbsocket closed")
          settings.channels.each do |channel|
            if channel[:sockets].include?(ws)
              channel[:sockets].delete(ws)
              warn("socket deleted")
              if socket = channel[:sockets].first
                EM.next_tick { socket.send({:restart => true }.to_json)}
              end
            end
          end
          #settings.sockets.delete(ws)
        end
      end
    end
  end
end