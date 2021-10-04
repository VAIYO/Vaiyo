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

class RoadmapsController < ApplicationController
    include Pagy::Backend
    include Registrar

    # GET /
    def index
        @milestones = Roadmap.all
        @pagy = pagy_array(Roadmap.all)

        render ("admins/roadmaps/roadmap_index")
    end

    # render view of create roadmap
    def create
        render ("admins/roadmaps/create")
    end

    # store milestone
    def store
        if params[:milestone][:milestone].blank? && params[:milestone][:step].blank? && params[:milestone][:description].blank?
            redirect_to admin_roadmaps_create_path, flash: { alert: "Milestone, Step, Description are required fields" }
        else
            milestone = Roadmap.new(
                milestone: params[:milestone][:milestone],
                year: params[:milestone][:year],
                week: params[:milestone][:week],
                step: params[:milestone][:step],
                description: params[:milestone][:description],
                status: params[:milestone][:milestone_status],
                is_enable: params[:milestone][:milestone_enable_status]
            ).save

            redirect_to admin_roadmaps_index_path, flash: { success: t('roadmap.table.created') }
        end
    end

    # render view of update roadmap
    def edit
        @roadmap = Roadmap.where(:id => params[:roadmap_id]).first

        render ('admins/roadmaps/edit')
    end

    # update milestone
    def update
        if params[:milestone][:milestone].blank? && params[:milestone][:step].blank? && params[:milestone][:description].blank?
            redirect_to admin_roadmaps_create_path, flash: { alert: "Milestone, Step, Description are required fields" }
        else
            @milestone = Hash.new
            @milestone['milestone'] = params[:milestone][:milestone]
            @milestone['year'] = params[:milestone][:year]
            @milestone['week'] = params[:milestone][:week]
            @milestone['step'] = params[:milestone][:step]
            @milestone['description'] = params[:milestone][:description]
            @milestone['status'] = params[:milestone][:milestone_status]
            @milestone['is_enable'] = params[:milestone][:milestone_enable_status]

            if Roadmap.find_or_initialize_by(:id => params[:roadmap_id]).update_attributes(@milestone)
                redirect_to admin_roadmaps_index_path, flash: { success: t('roadmap.table.updated') }
            end
        end
    end

    # delete milestone
    def destroy
        if Roadmap.find(params[:roadmap_id]).destroy
            redirect_to admin_roadmaps_index_path, flash: { success: t('roadmap.table.deleted') }
        end
    end
end
