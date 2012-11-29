class MySinatraApp < Sinatra::Base
  require "debugger"
  set :server, 'thin'
  set :channels, []
  get '/' do
    if !request.websocket?
      redirect "/index.html"
    else
      request.websocket do |ws|
        ws.onopen do
          #ws.send("Welcome")
          if settings.channels.empty?
            settings.channels << {:id => 1, :sockets => [ws]}
            ws.send({:id => 1}.to_json)
          else
             last_channel = settings.channels.last
             if last_channel[:sockets].size == 2
              last_id = last_channel[:id] + 1
              settings.channels << {:id => last_id, :sockets => [ws]}
              ws.send({:id => last_id}.to_json)
            else
              settings.channels.last[:sockets] << ws
             ws.send({:id => last_channel[:id]}.to_json)

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
            EM.next_tick { channel[:sockets].each{|s| s.send({:msg => params["msg"]}.to_json) } }
          else
            EM.next_tick {ws.send({:error => true}.to_json)}
          end
        end
        ws.onclose do
          warn("wetbsocket closed")
          #settings.sockets.delete(ws)
        end
      end
    end
  end
end