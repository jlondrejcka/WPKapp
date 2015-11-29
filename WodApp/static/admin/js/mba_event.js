/* [ ---- Gebo Admin Panel - location finder ---- ] */

	$(document).ready(function() {
		$("#dp2").datepicker({
           format: 'yyyy-mm-dd',
        });
//		$('#dp2').datepicker("option", "dateFormat", 'yy-mm-dd');
/*		$('#tp_2').timepicker({
			defaultTime: 'current',
			minuteStep: 1,
			disableFocus: true,
			template: 'dropdown'
//			timeFormat:'H:i:s'
		});*/
        $('#tp_2').timepicker({
			defaultTime: 'current',
			minuteStep: 1,
            showSeconds: true,
            showMeridian: false
        });
//		$('#tp_2').timepicker();
        gebo_maps.init();
		event_add_form.hide();
	});
    
		
    event_add_form = $('.event_form');
    event_table = $('.event_table');
    g_Map = $('#g_map');

	//* clear search input

	function ajax_helper(form_data)
	{
		$.ajax({
			url: base_url+"api/service/event",
			type: 'POST',
			data: form_data,
			success: function(msg)
			{
				if(msg.success==1)
				{
					if(msg.from=='delete')
					{
						event_table.find('tbody tr[event_id='+msg.event_id+']').remove();
		                $.sticky("Event has been successfully deleted", {autoclose : 5000, position: "top-center", type: "st-info" });					
						return;
					}

					event_add_form.hide();
					event=msg.event;
					tdcontent='<td>'+event.title+'</td>'+'<td>'+event.address+'</td>'+'<td>'+event.event_date+'</td>'+'<td>'+event.phone+'</td>';
					tdcontent+='<td><a href="javascript:void(0)" class="edit btn btn-primary btn-mini">Edit</a> <a href="javascript:void(0)" class="delete btn btn-warning btn-mini">Delete</a></td>';
					if(msg.from=='add')
					{
		                var last_row = event_table.find('tbody:last');
	                    last_row.append('<tr event_id='+event.event_id+'>'+tdcontent+'</tr>');
		                $.sticky("New Event has been successfully added", {autoclose : 5000, position: "top-center", type: "st-info" });					
					}
					else if(msg.from=='update')
					{
						event_table.find('tbody tr[event_id='+event.event_id+']').html(tdcontent);
		                $.sticky("Event information has been successfully updated", {autoclose : 5000, position: "top-center", type: "st-info" });					
					}
					curtr=event_table.find('tbody tr[event_id='+event.event_id+']');
					curtr.attr('lat',event.lat);
					curtr.attr('lng',event.lng);
					curtr.attr('city',event.city);
					curtr.attr('country',event.country);
				}
				else
				{
					if(msg.from=='update')
					{
					}
					else
						alert("Error:"+JSON.stringify(msg));
				}
			}
		}).fail( function(msg)
		{
				alert('Failed Operation:'+JSON.stringify(msg));
		});
		return false;
	}
	
	function clear_search() {
        $('#gmap_search input').val('');
    };
	//* clear location add form
    function clear_form() {
//        event_add_form.hide().find('input').val('');
    };
	//* marker message 
    function marker_message() {
        $.sticky('Drag marker to adjust position.', {autoclose : 5000, position: "top-center", type: "st-info" });
    };

	function hours_am_pm(time) {
        var hours = time[0] + time[1];
        var min = time[3] + time[4];
        if (hours < 12) {
            return hours + ':' + min + ' AM';
        } else {
            hours=hours - 12;
            hours=(hours.length < 10) ? '0'+hours:hours;
            return hours+ ':' + min + ' PM';
        }
    }

	$('#gmap_search').live('submit', function (e) {
//		alert('sdfsa');
		//* drop marker on map after location search
		e.preventDefault();
		var search_query = $('#gmap_search input').val();
		if(search_query != ''){
			g_Map.gmap3(
				{
					action: 'clear',
					name: 'marker'
				},
				{   action: 'addMarker',
					address: search_query,
					map: {
						center:true,
						zoom: 15
					},
					marker: {
						options: { draggable: true },
						events: {
							dragend: function(marker){
								marker_callback(marker);
								g_Map.gmap3('get').panTo(marker.position);
							}
						},
						callback: function(marker){
							if(marker){
								event_add_form.slideDown('normal');
								marker_callback(marker);
								marker_message();
							} else {
								clear_form();
								$.sticky("No adress found. Try again.", {autoclose : 5000, position: "top-center" });
							}
						}
					}
				}
			)
		} else {
			//* if location name not entered show message
			clear_form();
			$.sticky("Please Enter Location Name.", {autoclose : 5000, position: "top-center" });
		}
		return false;
	});

	$('#btn_new_event').live('click', function (e) {
		e.preventDefault();
		event_add_form.show();
		google.maps.event.trigger(g_Map.gmap3('get'), 'resize');

		$('.event_form input').val('');
		$('#event_id').val("-1");
		$('#description').html("");
		/*$('#event_id').val("-1");
		$('#title').val("");
		$('#address').val("");
//		$('#dp2').datepicker("setValue","");
		$('#dp2').data({date: ""}).datepicker('update').children("input").val("");
		$('#phone').val("");
		$('#tp_2').timepicker('setTime', "");
//		$('#tp_2').datepicker("");
		$('#description').val("");*/
	});


	$('.event_cancel').live('click', function (e) {
		e.preventDefault();
		event_add_form.hide();
	});

	$('.delete').live('click', function (e) {
		e.preventDefault();
		if (confirm("Are you sure to delete this event?") == false) {
			return;
		}
		event_add_form.hide();
		form_data={'operation':'delete_event','event_id':$(this).closest('tr').attr('event_id')};
		ajax_helper(form_data);
	});

	$('.event_save').live('click', function (e) {
		e.preventDefault();
		if($('#title').val()=="")
		{
			alert("Input Correct Information");
			return;
		}
		form_data={'operation':'add_update_event','event_id':$('#event_id').val(),'title':$('#title').val(),'description':$('#description').val(),'address':$('#address').val(),
			'event_date':$('#input_date').val()+' '+$('#tp_2').val(),'phone':$('#phone').val(),'lat':$('#lat').val(),'lng':$('#lng').val(),'city':$('#city').val(),'country':$('#country').val()};
		ajax_helper(form_data);
//		event_add_form.hide();
	});
	// marker callback after drag end
    function marker_callback(marker) {
//        $('#comp_lat_lng').val(marker.position.lat().toFixed(6)+', '+marker.position.lng().toFixed(6));
		$('#lat').val(marker.position.lat().toFixed(6));
		$('#lng').val(marker.position.lng().toFixed(6));
        g_Map.gmap3({
            action: 'getAddress',
            latLng: marker.getPosition(),
            callback: function(results){
                $('#address').val(results[0].formatted_address);
				for(i=1;i<results.length;i++)
				{
					if(results[i].types[0]=='locality')
					{
						$('#city').val(results[i].address_components[0].long_name);
					}
					else if(results[i].types[0]=='country')
					{
						$('#country').val(results[i].address_components[0].long_name);
					}
				}
            }
        });
    };
    
    gebo_maps = {
        init: function() {
            gebo_maps.create();
            gebo_maps.save_location();
            gebo_maps.edit_location();
//            gebo_maps.show_location();
            
        },
        create: function() {
			//* create basic map
            g_Map.gmap3({
                action: 'init',
                options:{
                    center  : [48.71, 49.87],
                    zoom    : 3
                },
                callback: function(){
                    $('#gmap_search').on('submit', function(){
//                       event_add_form.find('input').val('');
                       gebo_maps.drop_marker_search();
                       return false;
                    })
                }
            });
        },
        save_location: function() {
            //* save location
/*			event_add_form.on('click','button', function() {
                $('html,body').animate({ scrollTop: event_table.offset().top }, 'fast');
                var last_row = event_table.find('tbody:last');
                var comp_id = $('#comp_id').val();
                var last_id = parseInt( last_row.find('tr:last td:first').text() );
                if(comp_id != ''){
                    event_table.find('tbody > tr:nth-child('+comp_id+')').html('<td>'+comp_id+'</td><td>'+event_add_form.find('#comp_name').val()+'</td><td>'+event_add_form.find('#comp_contact').val()+'</td><td class="address">'+$('#address').val()+'</td><td>'+event_add_form.find('#comp_lat_lng').val()+'</td><td>'+event_add_form.find('#comp_phone').val()+'</td><td><a href="javascript:void(0)" class="show_on_map btn btn-mini btn-gebo">Show</a> <a href="javascript:void(0)" class="comp_edit btn btn-mini">Edit</a></td>');
                    $('#comp_id').val('');
                }else {
                    last_row.append('<tr><td>'+(last_id + 1)+'</td><td>'+event_add_form.find('#comp_name').val()+'</td><td>'+event_add_form.find('#comp_contact').val()+'</td><td class="address">'+$('#address').val()+'</td><td>'+event_add_form.find('#comp_lat_lng').val()+'</td><td>'+event_add_form.find('#comp_phone').val()+'</td><td><a href="javascript:void(0)" class="show_on_map btn btn-mini btn-gebo">Show</a> <a href="javascript:void(0)" class="comp_edit btn btn-mini">Edit</a></td></tr>');
                };
                clear_form();
                clear_search();
                g_Map.gmap3({action:'clear'});
                $.sticky("Location Successfuly Saved.", {autoclose : 5000, position: "top-center", type: "st-info" });
            }); */
        },
        edit_location: function() {
            //* edit location
			event_table.on('click','.edit',function(){
                event_add_form.show();
                var this_item = $(this).closest('tr');
				clear_search();
                $('#event_id').val(this_item.attr('event_id'));

				$('#title').val(this_item.find('td:nth-child(1)').text());
                $('#address').val(this_item.find('td:nth-child(2)').text());
				datetimearr=this_item.find('td:nth-child(3)').text().split(" ");

//				$('#dp2').datepicker("setDate", new Date(this_item.find('td:nth-child(3)').text()));
//				$('#tp_2').timepicker('setTime', new Date(this_item.find('td:nth-child(3)').text()));
//				$('#dp2').datepicker("setDate", datetimearr[0]);

				$('#dp2').data({date: datetimearr[0]}).datepicker('update').children("input").val(datetimearr[0]);
//				$('#dp2').datepicker("setValue", new Date(datetimearr[0]));
//				datetimearr[1]=hours_am_pm(datetimearr[1]);
				$('#tp_2').timepicker('setTime', datetimearr[1]);
//				$('#tp_2').timepicker({defaultTime: '11:42 PM'});

//                $('#event_date').val(this_item.find('td:nth-child(3)').text());
                $('#phone').val(this_item.find('td:nth-child(4)').text());
                $('#description').html(this_item.find('td:nth-child(6)').text());
				$('#lat').val(this_item.attr('lat'));
				$('#lng').val(this_item.attr('lng'));
				$('#city').val(this_item.attr('city'));
				$('#country').val(this_item.attr('country'));
//				var show_lat_lng = $('#comp_lat_lng').val(this_item.find('td:nth-child(5)').text());
				google.maps.event.trigger(g_Map.gmap3('get'), 'resize');
                var latLng_array = [this_item.attr('lat'),this_item.attr('lng')];//show_lat_lng.val().split(',');
                $('html,body').animate({ scrollTop: $('.main_content').offset().top - 40 }, 'fast', function(){
                    g_Map.gmap3(
                        {
                            action:'clear',
                            name:'marker'
                        },
                        {
                            action: 'addMarker',
                            latLng: latLng_array,
                            map: { center:true, zoom: 18 },
                            marker: {
                                options: { draggable: true },
                                events: {
                                    dragend: function(marker) {
                                        marker_callback(marker);
										g_Map.gmap3('get').panTo(marker.position);
                                    }
                                },
                                callback: function() {
                                    marker_message();
                                }
                            }
                        }
                    );
                });
            });
        },
        show_location: function() {
            //* show location
			event_table.on('click','.show_on_map',function(){
                clear_search();
                clear_form();
                //* Get lat,lng values from table
                var this_item = $(this).closest('tr');
                var show_lat_lng = $('#comp_lat_lng').val(this_item.find('td:nth-child(5)').text());
                var latLng_array = show_lat_lng.val().split(',');
                $('html,body').animate({ scrollTop: $('.main_content').offset().top - 40 }, 'fast', function(){
                    g_Map.gmap3(
                        {
                            action: 'clear',
                            name:'marker'
                        },
                        {   action: 'addMarker',
                            latLng: latLng_array,
                            map: { center:true, zoom: 18 }
                        }
                    );
                });
            });
        }

    };