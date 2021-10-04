# frozen_string_literal: true

# BigBlueButton open source conferencing system - http://www.bigbluebutton.org/.
#
# Copyright (c) 2018 BigBlueButton Inc. and by respective authors (see below).
#
# This program is free software; you can redistribute it and/or modify it under the
# terms of the GNU Lesser General Public License as published by the Free Software
# Foundation; either version 3.0 of the License, or (at your option) any later
# version.
#
# BigBlueButton is distributed in the hope that it will be useful, but WITHOUT ANY
# WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
# PARTICULAR PURPOSE. See the GNU Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public License along
# with BigBlueButton; if not, see <http://www.gnu.org/licenses/>.

class SlidersController < ApplicationController
    include Registrar
    include Pagy::Backend

    # GET /
    def index
        @sliders = Slider.all
        @pagy = pagy(Slider.all)

        render ("admins/sliders/slider_index")
    end

    # render view of create slider
    def create
        render ("admins/sliders/create")
    end

    # store slider
    def store
        if params[:slider][:title].blank? && params[:slider][:content].blank? && params[:slider][:link].blank?
            redirect_to admin_sliders_create_path, flash: { alert: "Title, Content, Link are required fields" }
        else
            slider = Slider.new(
                title: params[:slider][:title],
                content: params[:slider][:content],
                link: params[:slider][:link],
                status: params[:slider][:status]
            ).save

            redirect_to admin_sliders_index_path, flash: { success: t('slider.table.created') }
        end
    end

    # render view of update slider
    def edit
        @slider = Slider.where(:id => params[:slider_id]).first

        render ('admins/sliders/edit')
    end

    # update slider
    def update
        if params[:slider][:title].blank? && params[:slider][:content].blank? && params[:slider][:link].blank?
            redirect_to admin_sliders_create_path, flash: { alert: "Title, Content, Link are required fields" }
        else
            @slider = Hash.new
            @slider['title'] = params[:slider][:title]
            @slider['content'] = params[:slider][:content]
            @slider['link'] = params[:slider][:link]
            @slider['status'] = params[:slider][:status]

            if Slider.find_or_initialize_by(:id => params[:slider_id]).update_attributes(@slider)
                redirect_to admin_sliders_index_path, flash: { success: t('slider.table.updated') }
            end
        end
    end

    # delete slider
    def destroy
        if Slider.find(params[:slider_id]).destroy
            redirect_to admin_sliders_index_path, flash: { success: t('slider.table.deleted') }
        end
    end
end
